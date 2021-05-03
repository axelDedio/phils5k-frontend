import { Component, OnInit } from '@angular/core';
import {StravaBackendService} from '../../services/strava-backend.service';
import {Activity} from '../../model/Activity';
import * as d3 from 'd3';



@Component({
  selector: 'app-watt-plot',
  templateUrl: './watt-plot.component.html',
  styleUrls: ['./watt-plot.component.scss']
})
export class WattPlotComponent implements OnInit {
  avg_watts1: number[] = [];
  avg_watts2: number[] = [];
  rides: Activity[] = [];
  watt_data: {watt: number, date: Date}[] = [];

  constructor(private stravaBackendService: StravaBackendService) {
  }

  ngOnInit(): void {
    this.mapActivities();
    this.drawWattPlot();


  }

  mapActivities() {
    this.stravaBackendService.activityData.subscribe(data => {
      this.rides = data.filter(act => act.type === 'Ride');
      this.rides.map(ride => {
        let start_date = new Date(ride.start_date);
        let quart = Math.floor((start_date.getMonth() + 3) / 3);
        switch (quart) {
          case 1:
            this.avg_watts1.push(ride.average_watts);
            break;
          case 2:
            this.avg_watts2.push(ride.average_watts);
            break;
        }
      });
      this.rides.map( (ride:Activity) => {
        if (ride.average_watts) {
          this.watt_data.push({watt: ride.average_watts, date: new Date(ride.start_date)});
        }
      });
      console.log('wd', this.watt_data);
      this.drawScatterPlot();
    });
  }

  kde(kernel: (arg0: number) => number | null | undefined, thresholds: any[], data: Iterable<unknown>): [number,number][] {
    // @ts-ignore
    return thresholds.map(t => [t, d3.mean(data, d => kernel(t - d))]);
  }

  epanechnikov(bandwidth: number) {
    return (x: number) => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
  }

  drawWattPlot() {
    const margin = {top: 10, right: 40, bottom: 30, left: 40};
    const width = 400 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;


    const plotArea = d3.select("#wattPlot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        // translate this svg element to leave some margin.
        .append("g")
        .attr('id', 'wattPlotArea')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// X scale and Axis
    const x = d3.scaleLinear()
        .domain([0, 200])         // This is the min and the max of the data: 0 to 100 if percentages
        .range([0, width]);
    const bottomAxis = d3.axisBottom(x)
        .ticks(6)
        .tickFormat(d3.format(".2s"))

    plotArea
        .append('g')
        .attr('class', 'xAxisProgress')
        .style("font-size", "16px")
        .attr("transform", "translate(0," + (height) + ")")
        .call(bottomAxis)


// X scale and Axis
    const y = d3.scaleLinear()
        .domain([0, 0.03])
        .range([height, 0]);
    const leftAxis = d3.axisLeft(y)
        .ticks(1)

    plotArea
        .append('g')
        .style("font-size", "16px")
        .call(leftAxis);


    const density1: [number, number][] = this.kde(this.epanechnikov(20), x.ticks(60), this.avg_watts1)
    const density2: [number, number][] = this.kde(this.epanechnikov(20), x.ticks(60), this.avg_watts2)

    const line = d3.line()
        .x(d => x(d[0]))
        .y(d => y(d[1]))

    plotArea
        .append("path")
        .attr("class", "mypath")
        .datum(density1)
        .attr("fill", "#69b3a2")
        .attr("opacity", ".6")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round")
        .attr("d", line);

    plotArea
        .append("path")
        .attr("class", "mypath")
        .datum(density2)
        .attr("fill", "#404080")
        .attr("opacity", ".6")
        .attr("stroke", "#404080")
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round")
        .attr("d", line);
  }

  drawScatterPlot(){

    const margin = {top: 30, right: 40, bottom: 30, left: 40};
    const width = 1000 - margin.left - margin.right;
    const height = 320 - margin.top - margin.bottom;

    const tooltip = d3.select("#scatterPlot")
        .append("div")
        .style("position", "absolute")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .html("The exact value of<br>the Ground Living area is: ")



    const plotArea = d3.select("#scatterPlot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        // translate this svg element to leave some margin.
        .append("g")
        .attr('id', 'scatterPlotArea')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    let x = d3.scaleTime()
        .domain([new Date("2020-12-31"), new Date("2022-01-01")])
        .range([0, width]);

    let xAxis = d3.axisBottom(x)
        .ticks(12)
        .tickSizeOuter(0)

    const y = d3.scaleLinear()
        .domain([0, 300])
        .range([height, 0]);

    let yAxis = d3.axisLeft(y)
        .ticks(5)
        .tickSizeOuter(0)


    plotArea.append("g")
        .style("font-size", "16px")
        .attr("transform", "translate(0," + (height) + ")")
        .call(xAxis);
    const color = d3.scaleOrdinal(d3.schemeCategory10)


    plotArea.append("g")
        .style("font-size", "16px")
        .call(yAxis);



    const mouseover = (event: any, d:any) => {
      tooltip.style("opacity", "1")
      console.log(d);
      d3.select(event.srcElement).transition()
          .duration(1)
          .attr("r", 6);
    }

   const mousemove = (event: any, d:any) => {
      console.log(event)
      tooltip
          .style("left", (event.x + 20) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
          .style("top",  event.y + "px")
    }
    //
    // // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    const mouseleave = function (event:any, d: any){
      tooltip
          .transition()
          .duration(1)
          .style("opacity", 0)
      d3.select(event.srcElement).transition()
          .duration(1)
          .attr("r", 3);
    }

    plotArea
        .append('g')
        .selectAll("dot")
        .data(this.watt_data)
        .enter()
        .append("circle")
        .attr("id", "circles")
        .attr("r", 3)
        .style("fill", 'black')
        .attr("cx", 0 )
        .attr("cy", height)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .transition()
        .duration(1000)
        .attr("cx", function (d) { return x(d.date); } )
        .transition()
        .duration(1000)
        .attr("cy", function (d) { return y(d.watt); } )




  }
}
