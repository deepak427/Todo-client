import React from "react";
import { useRef } from "react";
import { select, scaleBand, axisBottom, scaleLinear, axisLeft } from "d3";
import { useEffect } from "react";
import "./BarChart.css";
import { useState } from "react";
import { useSelector } from "react-redux";

const BarChart = () => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const [dimentionX, setDimentionX] = useState();
  const [dimentionY, setDimentionY] = useState();

  const todoList = useSelector((state) => state.todosReducer).data?.reduce((acc, item) => [item].concat(acc), []);

  useEffect(() => {
    if (!todoList) return;

    const last4days = [];

    todoList.map((day) => {
      last4days.push(day.date);
    });

    const last4daysTodos = [];

    todoList.map((day) => {
      const obj = {
        todoListLength: day.totalTodos.length + day.checkedTodos.length,
        todoListCheckedLength: day.checkedTodos.length,
        date: day.date,
      };
      last4daysTodos.push(obj);
    });

    const last4daysLengths = [];

    todoList.map((day) => {
      last4daysLengths.push(day.totalTodos.length + day.checkedTodos.length);
    });

    const svg = select(svgRef.current);

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimentionX(entry.contentRect.width);
        setDimentionY(entry.contentRect.height);
      });
    });

    resizeObserver.observe(wrapperRef.current);

    if (!dimentionX) {
      return;
    }

    const xScale = scaleBand()
      .domain(last4days)
      .range([dimentionX, 0])
      .padding(0.5);
    const yScale = scaleLinear()
      .domain([0, Math.max(...last4daysLengths) + 1])
      .range([dimentionY, 0]);

    const colorScale = scaleLinear()
      .domain([4, 10])
      .range(["#63bff0", "#22a7f0"])
      .clamp(true);

    const colorScale_2 = scaleLinear()
      .domain([4, 10])
      .range(["#de6e56", "#e14b31"])
      .clamp(true);

    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale)
      .tickSize(dimentionX)
      .ticks(Math.max(...last4daysLengths) + 1);

    svg
      .select(".x-axis")
      .style("transform", `translateY(${dimentionY}px)`)
      .call(xAxis);
    svg
      .select(".y-axis")
      .style("transform", `translateX(${dimentionX}px)`)
      .call(yAxis);

    svg
      .selectAll(".bar")
      .data(last4daysTodos)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1")
      .attr("x", (value, index) => xScale(value.date))
      .attr("y", -dimentionY)
      .attr("width", xScale.bandwidth())
      .transition()
      .attr("fill", (value, index) => colorScale(value.todoListLength))
      .attr("height", (value) => dimentionY - yScale(value.todoListLength));

    svg
      .selectAll(".bar-2")
      .data(last4daysTodos)
      .join("rect")
      .attr("class", "bar-2")
      .style("transform", "scale(1, -1")
      .attr("x", (value, index) => xScale(value.date))
      .attr("y", -dimentionY)
      .attr("width", xScale.bandwidth())
      .transition()
      .attr("fill", (value, index) => colorScale_2(value.todoListCheckedLength))
      .attr(
        "height",
        (value) => dimentionY - yScale(value.todoListCheckedLength)
      );

    svg.selectAll("line").attr("stroke", "#0003");

    return () => resizeObserver.unobserve(wrapperRef.current);
  });

  return (
    <>
      <div className="bar-color-detail">
        <div>
          <div className="color-detail">
            <div className="blue-color"></div>
            <h5>Total tasks</h5>
          </div>
          <div className="color-detail">
            <div className="red-color"></div>
            <h5>Completed tasks</h5>
          </div>
        </div>
        <h4>Last 15 days Todo data</h4>
      </div>
      <div ref={wrapperRef} className="bar-chart-container">
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </>
  );
};

export default BarChart;
