import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import {User} from '../../model/user';
import {Observable} from 'rxjs';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import {Indivcost} from '../../model/indivcost';
import {
  NativeDateAdapter,
  DateAdapter,
  MAT_DATE_FORMATS
} from "@angular/material";
import { formatDate } from "@angular/common";
import { CostsService } from '../../service/data/costs.service';
import { UserService } from "./../../service/data/user.service";
import { Router } from '@angular/router';
export const PICK_FORMATS = {
  parse: { dateInput: { month: "short", year: "numeric", day: "numeric" } },
  display: {
    dateInput: "input",
    monthYearLabel: { year: "numeric", month: "short" },
    dateA11yLabel: { year: "numeric", month: "long", day: "numeric" },
    monthYearA11yLabel: { year: "numeric", month: "long" }
  }
};

class PickDateAdapter extends NativeDateAdapter {
  
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === "input") {
      return formatDate(date, "yyyy-MMM-dd", this.locale);
    } else {
      return date.toDateString();
    }
  }
}

@Component({
  selector: "app-addcosts",
  templateUrl: "./addcosts.component.html",
  styleUrls: ["./addcosts.component.css"],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
    
  ],
})



export class AddcostsComponent implements OnInit {


 
  arrayInputs = [
    {controlerInputName1 : ['',Validators.required], category : ['Premium outbound'] , Client : ['NISSAN'] ,Projet : ['',Validators.required]  ,respon :['1'] ,  reason : [''] }];

  formName =this.fb.group({
    controllerArray: this.fb.array([])
  })  


  pokemonControl = new FormControl();
  pokemonGroups: PokemonGroup[] = [
    {
      name: 'NISSAN',
      pokemon: [
        {value: 'P33', viewValue: 'P33'},
        {value: 'X12K', viewValue: 'X12K'},
        {value: 'B02E', viewValue: 'B02E'}
      ]
    },
    {
      name: 'PSA',
      pokemon: [
        {value: 'DPE', viewValue: 'DPE'},
        {value: 'eCMP', viewValue: 'eCMP'},
        {value: 'K0', viewValue: 'K0'},
        {value: 'M3M4', viewValue: 'M3M4'}
      ]
    },
    {
      name: 'Renault',
      pokemon: [
        {value: 'XJX', viewValue: 'XJX'},
        {value: 'HFE', viewValue: 'HFE'},
        {value: 'X52', viewValue: 'X52'},
      ]
    }
  ];




  
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  Department :string;
  user : User;
  selectproj:string;
  constructor(private Userservice: UserService,private fb: FormBuilder ,private costservice: CostsService, private datePipe: DatePipe, private router: Router) {}


  
  
  setArrayInputs(arrayInputs) {
    const arrayFG = arrayInputs.map(address => this.fb.group(address));
    const formArray = this.fb.array(arrayFG);
    this.formName.setControl('controllerArray', formArray);
  }

 
  addInput() {(this.formName.get('controllerArray') as FormArray).push(this.fb.group(  {controlerInputName1 : ['',Validators.required], category : ['Premium outbound'] , Client : ['NISSAN'] ,Projet : ['',Validators.required] , respon :['1']  , reason : [''] })) }

  removeInput(index) { this.formName.controls.controllerArray["controls"].splice(index,1) }



  ngOnInit() {
    
    
    
    this.setArrayInputs(this.arrayInputs) ;

    
    this.Userservice.GetUser(localStorage.getItem("token")).subscribe(
      data => (this.user = data),
      error => console.log(error)
    );

  }

  public onOptionsSelected(event) {
    const value = event.target.value;
    this.selectproj = value;
    console.log(value);
 }

  onClick($a) {
    this.Department=$a;
    console.log($a);  
  
  }
  public form = {
    date_week: null,
    user_id: null,
    department: null,

  };

   inv: Indivcost[] = [];

  
  onSubmit(){
    
    this.form.date_week = this.datePipe.transform(this.date.value, 'yyyy-MM-dd'); 
    this.form.user_id = localStorage.getItem('user');
    this.form.department = this.Department;
    console.log(this.form);
   let a=  this.formName.controls.controllerArray["controls"];

for (let c of  this.formName.controls.controllerArray["controls"]) {
  let data =  {} as Indivcost;
  data.category=c.value.category;
  data.client=c.value.Client;
  data.projet=c.value.Projet;
  data.amount=c.value.controlerInputName1;
  data.reason=c.value.reason;
  data.responsibility=c.value.respon;
  this.inv.push(data);
  console.log(data);

 
}


let results = [this.inv,this.form];
this.costservice.InsertCost(localStorage.getItem("token"),results).subscribe(
  data => console.log(data)
  );


  this.router.navigateByUrl('/costs');

  }


}
interface Pokemon {
  value: string;
  viewValue: string;
}

interface PokemonGroup {
  disabled?: boolean;
  name: string;
  pokemon: Pokemon[];
}