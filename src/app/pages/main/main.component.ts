import { Component, OnInit } from '@angular/core';
import {StravaBackendService} from '../../services/strava-backend.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  total: number = 0;
  constructor(private stravaBackendService: StravaBackendService) { }

  ngOnInit(): void {
  }

  getActivities() {
    this.stravaBackendService.getActivities().subscribe(data => {
      data.forEach( act=> {
        if(act.type === 'Ride') {
          this.total = this.total + act.distance;
        }
      });
      console.log('total: ', this.total);
    })
  }
}
