import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3'
import {StravaBackendService} from '../../services/strava-backend.service';
import {Activity} from '../../model/Activity';

export interface Point {
  x: number;
  y: number
}

@Component({
  selector: 'app-stats-tab',
  templateUrl: './stats-tab.component.html',
  styleUrls: ['./stats-tab.component.scss']
})

export class StatsTabComponent implements OnInit {

  public plot: any;
  data:Point[] = [{x:10, y:20}, {x:40, y:90}, {x:80, y:50}]
  hist_data = [1,1,1,2,2,2,3,3,3,3,3,3,3,4,4,4,5,5,5]
  rides: Activity[] = [];
  distances: number[] = [];
  bin_num: number = 2;

  constructor(private stravaBackendService: StravaBackendService,) { }

  ngOnInit(): void {


    this.getActivities();

  }

  getActivities() {
    this.stravaBackendService.activityData.subscribe(data => {
      this.rides = data.filter( act => act.type === 'Ride')
      this.distances = this.rides.map(act => Math.round(act.distance));
      console.log(this.distances);
      this.updatePlot();
    })
  }
  removePlot(){
    if (this.plot) {
      d3.select("#plot").selectAll('*').remove();
    }
  }
  updatePlot() {
    this.removePlot();
    this.drawPlot()
  }

  drawPlot() {
    let bin = d3.bin()
        .domain([0, 180000])
        .thresholds(this.bin_num);
    let bins = bin(this.distances);
    let max_number = Math.max(...bins.map(bin => bin.length));



    const margin = {top: 10, right: 40, bottom: 30, left: 60};
    const width = 450 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;


    this.plot = d3.select("#plot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        // translate this svg element to leave some margin.
        .append("g")
        .attr('id', 'area')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// X scale and Axis
    const x = d3.scaleLinear()
        .domain([0, 180000])         // This is the min and the max of the data: 0 to 100 if percentages
        .range([0, width]);
    const bottomAxis = d3.axisBottom(x).ticks(6).tickFormat(d3.format(".2s"))

    d3.select('#area')
        .append('g')
        .style("font-size", "16px")
        .attr("transform", "translate(0," + height + ")")
        .call(bottomAxis);

// X scale and Axis
    const y = d3.scaleLinear()
        .domain([0, max_number + 2])         // This is the min and the max of the data: 0 to 100 if percentages
        .range([height, 0]); // This is the corresponding value I want in Pixel
    this.plot
        .append('g')
        .style("font-size", "16px")
        .call(d3.axisLeft(y));


    this.plot
        .selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("width", (d: any) => { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", (d: any) => { return height - y(d.length); })
        .style("fill", "#2196F3")
        .attr("x", 1)
        // .attr("transform", (d: any) =>  { return "translate(1," + y(d.length) + ")"; })
        // .transition()
        // .duration(1000)
        .attr("transform", (d: any) =>  { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })




    // this.plot
    //     .selectAll("whatever")
    //     .data(this.data)
    //     .enter()
    //     .append("circle")
    //     .attr("cx", (d: Point) => {
    //       return x(d.x)
    //     })
    //     .attr("cy", (d: Point) => {
    //       return y(d.y)
    //     })
    //     .attr("r", 7)
  }

}
