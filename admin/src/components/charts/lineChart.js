import React from "react";
import Chart from "react-apexcharts";

const options = {
  chart: {
    id: "basic-bar",
    zoom: {
      enabled: false
    }
  },
  xaxis: {
    categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
  },
  tooltip: {
    theme: 'dark'
  },
};

const series = [
  {
    name: "Revenue",
    data: [200,433,725,344,354,565,342,435,546,575,75,24,546,45,544,645,324,535,467,453,546,534,646,454,545,643,436,343,443,670],
  },
];

const LineChart = () => {
  return <Chart options={options} series={series} type="line" />;
};

export default LineChart;
