import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './pages/main/main.component';
import { StatsTabComponent } from './components/stats-tab/stats-tab.component';
import {SliderModule} from 'primeng/slider';
import {FormsModule} from '@angular/forms';
import { WattPlotComponent } from './components/watt-plot/watt-plot.component';
import { FivekProgressComponent } from './components/fivek-progress/fivek-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    StatsTabComponent,
    WattPlotComponent,
    FivekProgressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    SliderModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
