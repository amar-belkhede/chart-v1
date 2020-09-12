import React, { Component } from "react";
import {
    select,
    csv,
    scaleLinear,
    scaleTime,
    scaleOrdinal,
    extent,
    axisLeft,
    axisBottom,
    line,
    curveBasis,
    // nest,
    schemeCategory10,
    descending,
} from "d3";
import { nest } from "d3-collection";
import "./LineChart.css";
import { colorLegend } from "./colorLegend";

class LineChart extends Component {
    componentDidMount() {
        this.getData();
    }
    componentDidUpdate() {
        this.getData();
    }

    renderLineChart = (data) => {
        const svgLine = select("#line > svg");

        const width = +svgLine.attr("width");
        const height = +svgLine.attr("height");

        const title = "A Week of Temperature Around the World";

        const xValue = (d) => d.timestamp;
        const xAxisLabel = "Time";

        const yValue = (d) => d.temperature;
        const circleRadius = 6;
        const yAxisLabel = "Temperature";

        const colorValue = (d) => d.city;

        const margin = { top: 60, right: 160, bottom: 88, left: 105 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const xScale = scaleTime()
            .domain(extent(data, xValue))
            .range([0, innerWidth])
            .nice();

        const yScale = scaleLinear()
            .domain(extent(data, yValue))
            .range([innerHeight, 0])
            .nice();

        const colorScale = scaleOrdinal(schemeCategory10);

        const g = svgLine
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xAxis = axisBottom(xScale).tickSize(-innerHeight).tickPadding(15);

        const yAxis = axisLeft(yScale).tickSize(-innerWidth).tickPadding(10);

        const yAxisG = g.append("g").call(yAxis);
        yAxisG.selectAll(".domain").remove();

        yAxisG
            .append("text")
            .attr("class", "axis-label")
            .attr("y", -60)
            .attr("x", -innerHeight / 2)
            .attr("fill", "black")
            .attr("transform", `rotate(-90)`)
            .attr("text-anchor", "middle")
            .text(yAxisLabel);

        const xAxisG = g
            .append("g")
            .call(xAxis)
            .attr("transform", `translate(0,${innerHeight})`);

        xAxisG.select(".domain").remove();

        xAxisG
            .append("text")
            .attr("class", "axis-label")
            .attr("y", 80)
            .attr("x", innerWidth / 2)
            .attr("fill", "black")
            .text(xAxisLabel);

        const lineGenerator = line()
            .x((d) => xScale(xValue(d)))
            .y((d) => yScale(yValue(d)))
            .curve(curveBasis);

        const lastYValue = (d) => yValue(d.values[d.values.length - 1]);

        const nested = nest()
            .key(colorValue)
            .entries(data)
            .sort((a, b) => descending(lastYValue(a), lastYValue(b)));

        console.log(nested);

        colorScale.domain(nested.map((d) => d.key));

        g.selectAll(".line-path")
            .data(nested)
            .enter()
            .append("path")
            .attr("class", "line-path")
            .attr("d", (d) => lineGenerator(d.values))
            .attr("stroke", (d) => colorScale(d.key));

        g.append("text").attr("class", "title").attr("y", -10).text(title);

        svgLine
            .append("g")
            .attr("transform", `translate(790,121)`)
            .call(colorLegend, {
                colorScale,
                circleRadius: 13,
                spacing: 30,
                textOffset: 15,
            });
    };

    getData = () => {
        csv(
            "https://vizhub.com/curran/datasets/data-canvas-sense-your-city-one-week.csv"
        ).then((data) => {
            data.forEach((d) => {
                d.temperature = +d.temperature;
                d.timestamp = new Date(d.timestamp);
            });
            this.renderLineChart(data);
        });
    };

    render() {
        return (
            <div id="line">
                <svg width={960} height={500}></svg>
            </div>
        );
    }
}

export default LineChart;
