import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const AreaChart = ({ stats }) => {
  const [data, setdata] = useState([]);
  const [dates, setdates] = useState([]);

  const options = {
    chart: {
      id: "basic-bar",
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: dates,
    },
    tooltip: {
      theme: "dark",
    },
  };

  const series = [
    {
      name: "revenue",
      data: data,
    },
  ];

  useEffect(() => {
    setdata(stats.map((stat) => stat.earning + '$').reverse());
    setdates(stats.map((stat) => new Date(stat.date).toLocaleDateString()).reverse());
  }, [stats]);
  return <Chart options={options} series={series} type="area" height={400} />;
};

export default AreaChart;
