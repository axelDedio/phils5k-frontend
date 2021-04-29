import { Component, OnInit } from '@angular/core';
import {StravaBackendService} from '../../services/strava-backend.service';
import {Activity} from '../../model/Activity';

@Component({
  selector: 'app-watt-plot',
  templateUrl: './watt-plot.component.html',
  styleUrls: ['./watt-plot.component.scss']
})
export class WattPlotComponent implements OnInit {
  avg_watts: number[] = [];

  constructor(private stravaBackendService: StravaBackendService) {
  }
  ngOnInit(): void {
    this.getActivities();

  }
  getActivities() {
    this.stravaBackendService.activityData.subscribe(data => {
      const rides = data.filter( act => act.type === 'Ride');
      rides.forEach( (act: Activity) => {
        this.avg_watts.push(act.average_watts);
      });

      console.log('w',this.avg_watts);
    })
  }

}
