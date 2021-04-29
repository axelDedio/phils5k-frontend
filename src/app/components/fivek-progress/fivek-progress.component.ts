import { Component, OnInit } from '@angular/core';
import {StravaBackendService} from '../../services/strava-backend.service';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import * as d3 from 'd3';

@Component({
  selector: 'app-fivek-progress',
  templateUrl: './fivek-progress.component.html',
  styleUrls: ['./fivek-progress.component.scss']
})
export class FivekProgressComponent implements OnInit {
  total: number = 0;
  today: Date = new Date();
  constructor(private stravaBackendService: StravaBackendService) {

  }

  ngOnInit(): void {
    this.getActivities();
    this.drawProgressPlot();
    this.drawYearPlot();
  }

  getActivities() {
    this.stravaBackendService.activityData.subscribe(data => {
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

  drawProgressPlot(){
    console.log('drawing plot');
    const margin = {top: 10, right: 40, bottom: 30, left: 15};
    const width = 1200 - margin.left - margin.right;
    const height = 100 - margin.top - margin.bottom;


    const plotArea = d3.select("#progressPlot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        // translate this svg element to leave some margin.
        .append("g")
        .attr('id', 'plotArea')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// X scale and Axis
    const x = d3.scaleLinear()
        .domain([0, 5000])         // This is the min and the max of the data: 0 to 100 if percentages
        .range([0, width]);
    const bottomAxis = d3.axisBottom(x).ticks(6).tickFormat(d3.format(".2s"))

    plotArea
        .append('g')
        .attr('id', 'xAxisProgress')
        .style("font-size", "16px")
        .attr("transform", "translate(0," + height + ")")
        .call(bottomAxis);

// X scale and Axis
    const y = d3.scaleLinear()
        .domain([0, 10])         // This is the min and the max of the data: 0 to 100 if percentages
        .range([height, 0]); // This is the corresponding value I want in Pixel

    plotArea
        .append('rect')
        .style("fill", "#27d68f")
        .attr('x', 1)
        .attr('y', height - y(0))
        .attr("width", x(100))
        .attr("height", y(0))
        // .style("stroke", '#1c9966')
        // .style("stroke-width", "5px")
        .transition()
        .duration(3000)
        .attr("width", x(this.total/1000))

    plotArea
        .append('rect')
        .attr("width", x(5000))
        .attr("height", y(0))
        .style("fill", "none")
        .style("stroke", '#1c9966')
        .style("stroke-width", "2px")

    d3.select('#plotArea')
        .append("image")
        .attr('x', 20)
        .attr('height', y(0))
        .attr("xlink:href", "../../../assets/img/311822.svg")
        .transition()
        .duration(3000)
        .attr("x", x(this.total/1000))
  }

  drawYearPlot() {
    console.log(new Date("2021-01-01 00:00:00"))

    const margin = {top: 30, right: 40, bottom: 30, left: 15};
    const width = 1200 - margin.left - margin.right;
    const height = 120 - margin.top - margin.bottom;


    const plotArea = d3.select("#yearPlot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        // translate this svg element to leave some margin.
        .append("g")
        .attr('id', 'yearPlotArea')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// X scale and Axis
    const x = d3.scaleLinear()
        .domain([0, 365])         // This is the min and the max of the data: 0 to 100 if percentages
        .range([0, width]);


    let xScale = d3.scaleTime()
        .domain([new Date("2021-01-01"), new Date("2022-01-01")])
        .range([0, width]);

    let xAxis = d3.axisTop(xScale)


    plotArea.append("g")
        .style("font-size", "16px")
        .call(xAxis);


// X scale and Axis
    const y = d3.scaleLinear()
        .domain([0, 10])         // This is the min and the max of the data: 0 to 100 if percentages
        .range([height, 0]); // This is the corresponding value I want in Pixel

    plotArea
        .append('rect')
        .style("fill", "#ed474d")
        .attr('x', 1)
        .attr('y', height - y(0))
        .attr("width", x(1))
        .attr("height", y(0))
        .transition()
        .duration(3000)
        .attr("width", x(this.getDayOfYear()))

    plotArea
        .append('rect')
        .attr("width", x(365))
        .attr("height", y(0))
        .style("fill", "none")
        .style("stroke", '#ad3438')
        .style("stroke-width", "2px")


  }
}

