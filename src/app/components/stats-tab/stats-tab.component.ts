import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3'
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
  constructor() { }

  ngOnInit(): void {
    this.drawPlot();

  }
  drawPlot() {
    const margin = {top: 10, right: 40, bottom: 30, left: 30};
    const width = 450 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;


    this.plot = d3.select("#plot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        // translate this svg element to leave some margin.
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// X scale and Axis
    const x = d3.scaleLinear()
        .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
        .range([0, width]);       // This is the corresponding value I want in Pixel
    this.plot
        .append('g')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

// X scale and Axis
    const y = d3.scaleLinear()
        .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
        .range([height, 0]);       // This is the corresponding value I want in Pixel
    this.plot
        .append('g', 'yaxis')
        .call(d3.axisLeft(y));

    this.plot
        .selectAll("whatever")
        .data(this.data)
        .enter()
        .append("circle")
        .attr("cx", (d: Point) => {
          return x(d.x)
        })
        .attr("cy", (d: Point) => {
          return y(d.y)
        })
        .attr("r", 7)
  }

}
