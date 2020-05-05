import { Component,ElementRef, OnInit,ViewChild,ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../../service/data/user.service';
import { Observable ,BehaviorSubject,merge,fromEvent} from 'rxjs';
import {DataSource} from '@angular/cdk/collections';
import { User } from '../../model/user';
import {HttpClient} from '@angular/common/http';
import { AddComponent } from '../../dialogs/user/add/add.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {map} from 'rxjs/operators';
import { DeleteComponent } from '../../dialogs/user/delete/delete.component';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,  
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements  OnInit {

  exampleDatabase: UserService | null;
  dataSource: UserDataSource | null;
  index: number;
  id: number;
 
  displayedColumns = [ 'email', 'name','operation', 'actions'];
  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,private userService: UserService) { }


    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {

    this.loaddata();
  }

  

  loaddata(){
    this.exampleDatabase = new UserService(this.httpClient);
    this.dataSource = new UserDataSource(this.userService, this.paginator, this.sort);
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
    
 
  addNew(user: User) {
    const dialogRef = this.dialog.open(AddComponent, {
      data: {User: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        
        this.exampleDatabase.dataChange.value.push(this.userService.getDialogData());
        
     
          this.loaddata();
          this.refreshTable();
     
        
       
      }
    }); 

     
  
  }

  deleteItem(i: number, id: number, email: string, name: string, type: string) {
    this.index = i;
    this.id = id;
    
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {id: id, email: email, name: name, type: type}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
      
        this.loaddata();
        this.refreshTable();
   
      }
    });
  }


 

  private refreshTable() {

    this.paginator._changePageSize(this.paginator.pageSize);
  }





}
export class UserDataSource extends DataSource<User> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: User[] = [];
  renderedData: User[] = [];
  constructor(public userService: UserService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
super();
this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
}




  connect(): Observable<User[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.userService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];
    this.userService.GetallUsers(localStorage.getItem('token'));


  return merge(...displayDataChanges).pipe(map( () => {
    // Filter data
    this.filteredData = this.userService.data.slice().filter((User: User) => {
      const searchStr = (User.email+User.name+User.type ).toLowerCase();
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
sortData(data: User[]): User[] {
if (!this._sort.active || this._sort.direction === '') {
  return data;
}

return data.sort((a, b) => {
  let propertyA: number | string = '';
  let propertyB: number | string = '';

  switch (this._sort.active) {
    case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
    case 'name': [propertyA, propertyB] = [a.id, b.id]; break;
    case 'email': [propertyA, propertyB] = [a.id, b.id]; break;
    case 'type': [propertyA, propertyB] = [a.id, b.id]; break;
    case 'created_at': [propertyA, propertyB] = [a.created_at, b.created_at]; break;
    case 'updated_at': [propertyA, propertyB] = [a.updated_at, b.updated_at]; break;
  }

  const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
  const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

  return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
});
}
}