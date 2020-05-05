import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpErrorResponse } from "@angular/common/http";
import { Cost} from "../../model/cost";
import {Observable,BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CostsService {
  private baseUrl = "http://localhost:8000/api";
  dataChange: BehaviorSubject<Cost[]> = new BehaviorSubject<Cost[]>([]);
  dialogData: any;
  constructor(private http: HttpClient) {}


   /** CRUD METHODS */
   
   get data(): Cost[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  
  GetallCosts($token): void {
    var headers_object = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "bearer " + $token
    });

    const httpOptions = {
      headers: headers_object
    };
    this.http.get<Cost[]>(`${this.baseUrl}/costs`, httpOptions).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  InsertCost($token,data) {
    var headers_object = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "bearer " + $token
    });

    const httpOptions = {
      headers: headers_object
    };

    return this.http.post(`${this.baseUrl}/insertcosts`, data,httpOptions)
  }
  

  





}

