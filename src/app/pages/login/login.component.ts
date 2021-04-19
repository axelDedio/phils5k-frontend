import { Component, OnInit } from '@angular/core';
import { StravaBackendService } from 'src/app/services/strava-backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  totalNumber: number = 0;
  activities: any;



  constructor(private stravaBackendService: StravaBackendService) { }

  ngOnInit(): void {
  }
  getToken() {
    console.log('hallo');
    this.stravaBackendService.callLogin();
  }

  getActivities() {
    this.stravaBackendService.getActivities().subscribe(data => {
      console.log(data);
      this.totalNumber = data.length;
      this.activities = data;
    });
  }

  getLogin() {
    this.stravaBackendService.getLogin().subscribe(data => {
      console.log(data);
    });
  }
}
