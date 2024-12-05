"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 400,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: [2, 2],
    curve: "smooth",
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
  },
  xaxis: {
    type: "category",
    categories: [
      "9 AM",
      "10 AM",
      "11 AM",
      "12 PM",
      "1 PM",
      "2 PM",
      "3 PM",
      "4 PM",
      "5 PM",
      "6 PM",
    ], // Categories match the data points
    axisBorder: {
      show: true, // Ensure the x-axis border is visible
    },
    axisTicks: {
      show: true, // Ensure ticks align with data points
    },
  },
  yaxis: {
    title: {
      text: "Number of Calls",
      style: {
        fontSize: "12px",
        fontWeight: "bold",
      },
    },
    min: 0,
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: (val: number) => `${val} calls`,
    },
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartOne: React.FC = () => {
  const series = [
    {
      name: "Total Calls",
      data: [50, 60, 45, 70, 90, 80, 100, 85, 60, 75], // Matches the x-axis categories
    },
    {
      name: "Successful Calls",
      data: [30, 40, 30, 50, 70, 60, 80, 65, 40, 55], // Matches the x-axis categories
    },
  ];

  return (
    <div className="border-stroke pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 col-span-12 rounded-sm border bg-white px-5 pb-5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="min-w-47.5 flex">
            <span className="border-primary mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border">
              <span className="bg-primary block h-2.5 w-full max-w-2.5 rounded-full"></span>
            </span>
            <div className="w-full">
              <p className="text-primary font-semibold">Performance</p>
              <p className="text-sm font-medium">24 Outbound Calls Today</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
