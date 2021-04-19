import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Activity} from '../model/Activity';

@Injectable({
  providedIn: 'root'
})
export class StravaBackendService {


  constructor(private http: HttpClient) {
  }
  getActivities(): Observable<Activity[]> {
    return this.http.post<Activity[]>('api/getActivities', {});
  }

  callLogin() {
    window.location.href = '/api/auth';
  }
  getLogin(): Observable<any> {
    return this.http.get<any>('/api/auth');
  }
}
