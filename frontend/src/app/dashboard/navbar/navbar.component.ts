import { Component, OnInit,Input} from '@angular/core';
import {User} from '../../model/user';
import { Router } from '@angular/router';
import { TokenService  } from '../../service/token.service';
import {  AuthService } from '../../service/auth.service';
import {UserService} from './../../service/data/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  @Input()
  user : User;
  users:User[];
  
  constructor(
    private Auth: AuthService,
    private router: Router,
    private Token: TokenService,
    private Userservice:UserService
  ) { }


  ngOnInit() {
   

   
    this.Userservice.GetUser(localStorage.getItem("token")).subscribe(
      data => (this.user = data),
      error => console.log(error)
    );
   
  }

 
  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }


}
