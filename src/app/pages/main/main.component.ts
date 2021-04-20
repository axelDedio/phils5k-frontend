import { Component, OnInit } from '@angular/core';
import {StravaBackendService} from '../../services/strava-backend.service';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  total: number = 0;
  constructor(private stravaBackendService: StravaBackendService,
              public config: NgbProgressbarConfig) {
    config.animated = true;
    config.height = '100px';
    config.striped = true;
    config.type = 'success';
    config.max = 5000;
  }

  ngOnInit(): void {
    this.getActivities();
  }


  getActivities() {
    this.stravaBackendService.getThisYearsCyclingActivities().subscribe(data => {
      console.log(data);
      data.forEach( act => {
        if(act.type === 'Ride') {
          this.total = this.total + act.distance;
        }
      });
      this.total = Math.round(this.total)
      console.log('total: ', this.total);
    })
  }
}
