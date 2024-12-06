"use client";

import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  colors: ["#3C50E0", "#009900", "#e60000"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "bar",
    height: 335,
    stacked: true,
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: "25%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: "25%",
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
    },
  },
  dataLabels: { enabled: false },
  xaxis: { categories: ["M", "T", "W", "T", "F", "S", "S"] },
  legend: {
    position: "top",
    horizontalAlign: "left",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",
    markers: { radius: 99 },
  },
  fill: { opacity: 1 },
};

const ChartTwo: React.FC = () => {
  // State for dynamic series data
  const [series, setSeries] = useState([
    { name: "Total Calls", data: [] },
    { name: "Successful Calls", data: [] },
    { name: "Failed Calls", data: [] },
  ]);

  // Mock call records (you can replace this with API data)
  const generateCallData = () => {
    const totalCalls = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 100),
    );
    const successCalls = totalCalls.map((total) => Math.floor(total * 0.6)); // 60% success rate
    const failedCalls = totalCalls.map((total, i) => total - successCalls[i]);
    return { totalCalls, successCalls, failedCalls };
  };

  // Load data dynamically for the current week
  useEffect(() => {
    const callData = generateCallData();
    setSeries([
      { name: "Total Calls", data: callData.totalCalls },
      { name: "Successful Calls", data: callData.successCalls },
      { name: "Failed Calls", data: callData.failedCalls },
    ]);
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Profit this week
          </h4>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <select
              name="week"
              id="week"
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
              onChange={() => {
                // Regenerate data on week change (replace with actual API call for dynamic weeks)
                const callData = generateCallData();
                setSeries([
                  { name: "Total Calls", data: callData.totalCalls },
                  { name: "Success Calls", data: callData.successCalls },
                  { name: "Failed Calls", data: callData.failedCalls },
                ]);
              }}
            >
              <option value="current">This Week</option>
              <option value="last">Last Week</option>
            </select>
            <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                  fill="#637381"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
