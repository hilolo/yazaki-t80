import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable()
export class AfterLoginService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    
     if(!localStorage.getItem('token'))
    {this.router.navigateByUrl('/login');}
    
    
    return this.Token.loggedIn();
  }
  constructor(private Token: TokenService,   private router: Router) { }

}
