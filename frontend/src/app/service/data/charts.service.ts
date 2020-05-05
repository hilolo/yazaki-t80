import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:8000/api";


  getbar($token,$y) {
    var headers_object = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "bearer " + $token
    });

    const httpOptions = {
      headers: headers_object
    };

    return this.http.get(`${this.baseUrl}/bardashboard/`+ $y, httpOptions).toPromise();
  }


  graphelement($token,$y,$p) {
    var headers_object = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "bearer " + $token
    });

    const httpOptions = {
      headers: headers_object
    };

    return this.http.get(`${this.baseUrl}/projetstats/`+ $y+'/'+$p, httpOptions).toPromise();
  }


  piestats($token,$y,$p) {
    var headers_object = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "bearer " + $token
    });

    const httpOptions = {
      headers: headers_object
    };

    return this.http.get <number>(`${this.baseUrl}/piestats/`+ $y+'/'+$p, httpOptions).toPromise();
  }



}
