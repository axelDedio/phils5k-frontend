import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Activity} from '../model/Activity';
import {retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StravaBackendService {
  public activityData = new BehaviorSubject<Activity[]>([]);


  constructor(private http: HttpClient) {
    this.getThisYearsCyclingActivities().subscribe( data => {
      this.activityData.next(data);
    })
  }
  getThisYearsCyclingActivities(): Observable<Activity[]> {
    return this.http.post<Activity[]>('api/getActivities', {after: 1609459200, per_page: 200 });
  }

  // updateActivity() {
  //   this.getThisYearsCyclingActivities().subscribe( data => {
  //     this.activityData.next(data);
  //   });
  // }

}
