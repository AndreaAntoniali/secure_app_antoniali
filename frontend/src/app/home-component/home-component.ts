import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../users/user';
import { AuthServices } from '../shared/auth/auth-services';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from "@angular/material/card";
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-home-component',
  imports: [RouterModule, MatCard, MatCardContent, MatCardHeader, MatCardActions, MatAnchor],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss'
})
export class HomeComponent {
  svc = inject(AuthServices)
  router = inject(Router)
}
