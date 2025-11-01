import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { LoginComponent } from './shared/auth/login-component/login-component';
import { AdminComponent } from './admin/admin-component/admin-component';
import { adminComponentGuard } from './admin/admin-component-guard';
import { authGuard } from './shared/auth/auth-guard';

export const routes: Routes = [
    {path: "login", component : LoginComponent, title : "Login"},
    {path: "home", component : HomeComponent, title : "Home", canActivate : [authGuard]},
    {path: "admin", component : AdminComponent, title : "Administration", 
        canActivate : [adminComponentGuard, authGuard]},
    {path : "", pathMatch : 'full', redirectTo: 'home'},
    {path : '**', redirectTo : 'home'}

];
