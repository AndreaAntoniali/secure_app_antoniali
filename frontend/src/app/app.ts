import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { LoginComponent } from './shared/auth/login-component/login-component';
import { AuthServices } from './shared/auth/auth-services';
import { MatCard } from "@angular/material/card";
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLinkWithHref, RouterLink, RouterLinkActive, MatToolbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private readonly authSvc = inject(AuthServices) as AuthServices;
  private readonly router = inject(Router);
  protected readonly title = signal('frontend');
  protected readonly isLoggedIn = computed (() => this.authSvc.isLoggedIn());
  protected readonly isAdmin = computed (() => this.authSvc.isLoggedIn());
  
  constructor(){

    
    if (!this.authSvc.isLoggedIn()){
      console.log("Hihi tu n'es pas connecté je te mets sur la page login")
    
    }
  }
}
