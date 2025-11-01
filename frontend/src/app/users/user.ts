import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserDto } from '../types/user-dto';
import { environment } from '../../environments/environment';
import { catchError, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly http = inject(HttpClient) as HttpClient;
  readonly users = signal<UserDto[]>([]);

  loadAll(){
    this.http.get<UserDto[]>(`${environment.apiUrl}/users`, {withCredentials:true})
    .pipe(catchError(() => of([]))).subscribe(list => this.users.set(list))
  }
  
}
