import React from "react";
import Chart from "react-apexcharts";

const options = {
  chart: {
    width: 380,
    type: 'donut',
  },
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 270
    }
  },
  dataLabels: {
    enabled: false
  },
  fill: {
    type: 'gradient',
  },
  legend: {
    formatter: function(a, b) {
      return a + " - " + b.w.globals.series[b.seriesIndex]
    }
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
}

const series = [44, 55, 41, 17, 15]

const DonutChart = () => {
  return <Chart options={options} series={series} type="donut" />;
};

export default DonutChart;
