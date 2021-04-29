import { Component, OnInit } from '@angular/core';
import { StravaBackendService } from 'src/app/services/strava-backend.service';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  totalNumber: number = 0;
  activities: any;



  constructor(private loginService: LoginService ) { }

  ngOnInit(): void {
  }
  getToken() {
    console.log('hallo');
    this.loginService.callLogin();
  }

  getLogin() {
    this.loginService.getLogin().subscribe(data => {
      console.log(data);
    });
  }
}
