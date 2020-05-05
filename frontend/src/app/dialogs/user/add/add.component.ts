import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {UserService} from '../../../service/data/user.service';

import {UserComponent} from '../../../datatable/user/user.component';
import {AuthapiService} from '../../../service/authapi.service';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent  {
  constructor(public dialogRef: MatDialogRef<AddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public authapiService: AuthapiService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  public form = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
    type: null
  };
  public error = [];


  

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
     
        '';
  }

  

  onNoClick(): void {
    this.dialogRef.close();
  }
  

  public confirmAdd(): void {

    console.log(this.form);
    this.form.email= this.data.email;
    this.form.name=this.data.name;
    this.form.password=this.data.password;
    this.form.password_confirmation=this.data.password;
    this.form.type=this.data.type;  
 
    this.authapiService.signup(this.form).subscribe(
   
      error => this.handleError(error)
    );

  }


  handleError(error) {
    this.error = error.error.errors;
    console.log(this.error);
  }

}
