import React, {memo} from 'react';
import * as d3 from "d3";

const LineGraph = ({...props}) => {
    const {chartData} = props;

    const drawLineChart = (data) => {
        var margin = { top: 20, right: 80, bottom: 30, left: 50 },
             width = 600 - margin.left - margin.right,
             height = 300 - margin.top - margin.bottom;

        const yMaxValue = d3.max(data, function (d) { 
            return d3.max(d, function (d) { 
                return d.value; 
            }) });
        const xMinValue = d3.min(data[0], d => d.label);
        const xMaxValue = d3.max(data[0], d => d.label);

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

            var segment = svg.selectAll(".segment")
                .data(data)
                .enter().append("g")
                .attr("class", "segment");
            
            var color = d3.scaleOrdinal(d3.schemeCategory10);

            segment.append("path")
            .attr("class", "line")
            .attr('fill', 'none')
            .attr("id", function (d) { 
                    return d[0].value;
            })
            .attr("d", function (d) { 
                return line(d.map((d) => d)); 
            })
            .style("stroke", function (d) { 
                return color(d[0].value);
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