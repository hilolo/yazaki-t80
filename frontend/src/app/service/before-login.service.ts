import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable()
export class BeforeLoginService implements CanActivate  {

 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    //this.router.navigateByUrl('/login');
   /* if(localStorage.getItem('token'))
    this.router.navigateByUrl('/dashboard');
    else     this.router.navigateByUrl('/login');*/

    if(localStorage.getItem('token'))
    {this.router.navigateByUrl('/dashboard');}
    return !this.Token.loggedIn();
  }
  constructor(private Token: TokenService,   private router: Router) { }

}
