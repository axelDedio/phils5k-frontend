import { Component, OnInit } from '@angular/core';
import {StravaBackendService} from '../../services/strava-backend.service';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }

}
