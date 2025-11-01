import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { AuthServices } from '../auth-services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-component',
  imports: [ MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatError,
    MatIcon,
    MatCardContent,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    MatCardFooter],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss'
})

// - tente une connexion via le service idoine
//On va devoir appeler la fonction login de service quand on appuie sur submit 
//ça marche 

// - a che un message d'attente si le réseau tarde à répondre
// -ça marche 
// - a che un message d'erreur si il y a un problème
// - navigue vers home si la connexion a réussi

export class LoginComponent {
  svc = inject(AuthServices) as AuthServices;
  router = inject(Router) as Router;

  constructor(){
    effect(()=> {
      if (this.svc.isLoggedIn()){
        this.router.navigate(['/'])
      }
    })
  }



  readonly form = new FormGroup({
    login : new FormControl('', {nonNullable : true, 
      validators: [Validators.minLength(5), Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(1), Validators.required],
    }),
  });

  submit()  {
    const login = this.form.controls.login.value;
    const password = this.form.controls.password.value;
    if (login && password){
      this.svc.login(login, password);
    }
    
    if (this.svc.isLoggedIn() && !this.svc.isAdmin()){
      this.router.navigate(['']);
    }
    //else if (this.svc.isAdmin()){
    //   this.router.navigate(['admin'])
    // }
  };
}
