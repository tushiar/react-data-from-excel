import React, { useState } from "react";
import { LineChart, AreaChart, BarChart } from "react-charts-d3";
const Charts = ({ barChartData, pieChartData }) => {
  //   const tempData = {
  //     param0: [1, 2, 3, 4, 5, 6],
  //     param10: [2, 5, 888, 3333, 1111, 5656],
  //   };

  const bardata = [
    {
      key: "Group 1",
      values: [
        { x: "A", y: 23 },
        { x: "B", y: 8 },
      ],
    },
    {
      key: "Group 2",
      values: [
        { x: "A", y: 15 },
        { x: "B", y: 37 },
      ],
    },
    {
      key: "Group 3",
      values: [
        { x: "A", y: 45 },
        { x: "B", y: 67 },
      ],
    },
    {
      key: "Group 4",
      values: [
        { x: "A", y: 35 },
        { x: "B", y: 87 },
      ],
    },
  ];
  const piedata = [
    { label: "Group 1", value: 23 },
    { label: "Group 2", value: 15 },
  ];
  return (
    <div>
      <div className="container">
        <div className="row row-cols-3">
          <div className="col">
            <LineChart data={barChartData} />
          </div>
          <div className="col">
            <BarChart data={barChartData} />
          </div>
          <div className="col">
            <AreaChart data={barChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
