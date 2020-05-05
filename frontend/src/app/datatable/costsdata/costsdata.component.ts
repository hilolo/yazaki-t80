import { Component,ElementRef, OnInit,ViewChild,ChangeDetectionStrategy } from '@angular/core';
import { CostsService } from '../../service/data/costs.service';
import { Observable ,BehaviorSubject,merge,fromEvent} from 'rxjs';
import {DataSource} from '@angular/cdk/collections';
import { Cost } from '../../model/cost';
import {Indivcost  } from '../../model/indivcost';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-costsdata',
  templateUrl: './costsdata.component.html',
  styleUrls: ['./costsdata.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CostsdataComponent implements OnInit {

  
  exampleDatabase: CostsService | null;
  dataSource: UserDataSource | null;
  index: number;
  id: number;
  displayedColumns = [ 'date_week', 'users.name','department','totalcoasts','totalamount', 'actions'];
  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,private costservice: CostsService) { }


    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {

    this.loaddata();
    
  }

  
  calculateMealTotal(products: Indivcost[]): number {
    return products.reduce((acc, product) => acc + product.amount, 0)
  }

  loaddata(){
    this.exampleDatabase = new CostsService(this.httpClient);
    this.dataSource = new UserDataSource(this.costservice, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
    
  
  private refreshTable() {

    this.paginator._changePageSize(this.paginator.pageSize);
  }

}
export class UserDataSource extends DataSource<Cost> {
  
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Cost[] = [];
  renderedData: Cost[] = [];
  constructor(public costService: CostsService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
super();
this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
}




  connect(): Observable<Cost[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.costService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];
    this.costService.GetallCosts(localStorage.getItem('token'));


  return merge(...displayDataChanges).pipe(map( () => {
    // Filter data
    this.filteredData = this.costService.data.slice().filter((User: Cost) => {
    
      const searchStr = (User.date_week+User.users.name+User.department).toLowerCase();
      return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
    });
    // Sort filtered data
    const sortedData = this.sortData(this.filteredData.slice());

    // Grab the page's slice of the filtered sorted data.
    const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
    this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
    return this.renderedData;
  }
));
}

disconnect() {}


/** Returns a sorted copy of the database data. */
sortData(data: Cost[]): Cost[] {
if (!this._sort.active || this._sort.direction === '') {
  return data;
}

return data.sort((a, b) => {
  let propertyA: number | string = '';
  let propertyB: number | string = '';

  switch (this._sort.active) {
    case 'date_week': [propertyA, propertyB] = [a.date_week, b.date_week]; break;

  }

  const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
  const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

  return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
});
}
}
