import { Component, OnInit } from '@angular/core';
import { AuthapiService } from '../service/authapi.service';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  };

  public error = null;

  constructor(
    private Jarwis: AuthapiService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) { }

  onSubmit() {
  
    this.Jarwis.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
   
    this.Token.handle(data.access_token);
    localStorage.setItem("user", data.user);
    this.Auth.changeAuthStatus(true);
    
    this.router.navigateByUrl('/dashboard');

  }

  handleError(error) {
    this.error = error.error.error;
  }
  ngOnInit() {
    

  }

}
