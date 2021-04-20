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
  getThisYearsCyclingActivities(): Observable<Activity[]> {
    return this.http.post<Activity[]>('api/getActivities', {after: 1609459200, per_page: 200 });
  }

  callLogin(): void {
    window.location.href = '/api/auth';
  }
  getLogin(): Observable<any> {
    return this.http.get<any>('/api/auth');
  }
}
