import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Error404Component } from './na/error404/error404.component';
import { AfterLoginService } from './service/after-login.service';
import { BeforeLoginService } from './service/before-login.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { CostsComponent } from './costs/costs.component';
import { AddcostsComponent} from './costs/addcosts/addcosts.component';


const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full'  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'costs',
    component: CostsComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'Addcosts',
    component: AddcostsComponent,
    canActivate: [AfterLoginService]
  },
  { path: '**', 
  component: Error404Component
 }

];




@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
