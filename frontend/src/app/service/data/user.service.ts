import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse } from "@angular/common/http";
import { User} from "../../model/user";
import {Observable,BehaviorSubject} from 'rxjs';

@Injectable()
export class UserService {
  private baseUrl = "http://localhost:8000/api";

  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  dialogData: any;

  constructor(private http: HttpClient) {}

  GetUser($token) {
    var headers_object = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "bearer " + $token
    });

    const httpOptions = {
      headers: headers_object
    };

    return this.http.get<User>(`${this.baseUrl}/me`, httpOptions);
  }
  

   /** CRUD METHODS */
   
   get data(): User[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  
  GetallUsers($token): void {
    var headers_object = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "bearer " + $token
    });

    const httpOptions = {
      headers: headers_object
    };
    this.http.get<User[]>(`${this.baseUrl}/users`, httpOptions).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }


  deleteuser ($id,$token) {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + $token
    });

    const httpOptions = {
      headers: headers_object
    };

      console.log("bearer " + $token);
    return this.http.delete(`${this.baseUrl}/user/`+$id,httpOptions);

  }





 /* GetallUsers($token): Observable<User[]> {
    var headers_object = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "bearer " + $token
    });

    const httpOptions = {
      headers: headers_object
    };

    return this.http.get<User[]>(`${this.baseUrl}/users`, httpOptions);
  }*/


}
