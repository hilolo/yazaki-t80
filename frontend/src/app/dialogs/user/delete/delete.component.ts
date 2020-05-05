import { Component, OnInit,Inject } from '@angular/core';
import {UserService} from '../../../service/data/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent  {
  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: UserService) { }

onNoClick(): void {
this.dialogRef.close();
}

confirmDelete(): void {
  this.dataService.deleteuser(this.data.id,localStorage.getItem('token')).subscribe(
    result => console.log(result),
    err => console.error(err)
  );
}


}
