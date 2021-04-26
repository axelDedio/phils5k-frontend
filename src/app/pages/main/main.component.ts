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
  today: Date = new Date();
  constructor(private stravaBackendService: StravaBackendService,
              public config: NgbProgressbarConfig) {
    config.animated = true;
    config.height = '100px';
    config.striped = true;
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

  getDayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now.valueOf() - start.valueOf()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    console.log('Day of year: ' + day);
    return day;
  }

  getKms() {
    return Math.round(this.total/1000);
  }
}
