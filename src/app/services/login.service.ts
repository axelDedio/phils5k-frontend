import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  callLogin(): void {
    window.location.href = '/api/auth';
  }
  getLogin(): Observable<any> {
    return this.http.get<any>('/api/auth');
  }

}
