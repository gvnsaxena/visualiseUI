import React, {memo} from 'react';
import * as d3 from "d3";

const LineGraph = ({...props}) => {
    const {chartData} = props;

    const drawLineChart = (data) => {
        var margin = { top: 20, right: 80, bottom: 30, left: 50 },
             width = 600 - margin.left - margin.right,
             height = 500 - margin.top - margin.bottom;

        const yMaxValue = d3.max(data, function (d) { 
            return d3.max(d.lineData, function (d) { 
                return d.value; 
            })}) + 30;
        const xMinValue = d3.min(data[0].lineData, d => d.label);
        const xMaxValue = d3.max(data[0].lineData, d => d.label);
  
            const xScale = d3
                .scaleLinear()
                .domain([xMinValue, xMaxValue])
                .range([0, width]);
                
            const yScale = d3
                .scaleLinear()
                .range([height, 0])
                .domain([0, yMaxValue]);

            var line = d3.line()
            .x(d => {
                return xScale(d.label)
            })
            .y(d => {
                return yScale(d.value)
            })    
            .curve(d3.curveMonotoneX);

            var color = d3.scaleOrdinal(d3.schemeCategory10);

            var svg = d3.select("#divChartTrends").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                
            svg
                .append('g')
                .attr('class', 'x-axis')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom().scale(xScale).tickSize(15));
            svg
                .append('g')
                .attr('class', 'y-axis')
                .call(d3.axisLeft(yScale));

            var legend = svg.selectAll('.segment')
                .data(data)
                .enter()
                .append('g')
                .attr('class', 'legend');

            legend.append("path")
                .attr("class", "line")
                .attr('fill', 'none')
                .attr("d", function (d) { 
                    return line(d.lineData.map((d) => d)); 
                })
                .style("stroke", function(d) { 
                    return color(d.key); 
                });
          
              legend.append('rect')
                .attr('x', width - 170)
                .attr('fill', 'none')
                .attr('y', function(d, i) {
                    return i * 20;
                })
                  .attr('width', 10)
                  .attr('height', 10)
                  .style('fill', function(d) {
                    return color(d.key);
                  });
          
              legend.append('text')
                .attr('x', width - 152)
                .attr('y', function(d, i) {
                    return (i * 20) + 11;
                  })
                .text(function(d) {
                  return d.key;
                });

            var segment = svg.selectAll(".segment")
                .data(data)
                .enter().append("g")
                .attr("class", "segment");

            segment.append("path")
            .attr("class", "line")
            .attr('fill', 'none')
            .attr("id", function (d) { 
                    return d.key;
            })
            .attr("d", function (d) { 
                return line(d.lineData.map((d) => d)); 
            })
            .style("stroke", function (d) { 
                return color(d.key);
        })
    }

    return(
            <div id="divChartTrends" className="chartClass">
                <h1>Multi Line Chart</h1> 
                {chartData.length > 0 && drawLineChart(chartData)}
            </div>
    )
}

export default memo(LineGraph);