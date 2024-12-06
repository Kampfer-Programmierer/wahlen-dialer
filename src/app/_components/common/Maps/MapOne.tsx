"use client";
import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts/highmaps";

const IndiaMapChart = ({ containerId }: { containerId: string }) => {
  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const topology = await fetch(
          "https://code.highcharts.com/mapdata/countries/in/in-all.topo.json"
        ).then((response) => response.json());

        const data = [
          ["in-py", 10], ["in-ld", 11], ["in-wb", 12], ["in-or", 13],
          ["in-br", 14], ["in-sk", 15], ["in-ct", 16], ["in-tn", 17],
          ["in-mp", 18], ["in-2984", 19], ["in-ga", 20], ["in-nl", 21],
          ["in-mn", 22], ["in-ar", 23], ["in-mz", 24], ["in-tr", 25],
          ["in-3464", 26], ["in-dl", 27], ["in-hr", 28], ["in-ch", 29],
          ["in-hp", 30], ["in-jk", 31], ["in-kl", 32], ["in-ka", 33],
          ["in-dn", 34], ["in-mh", 35], ["in-as", 36], ["in-ap", 37],
          ["in-ml", 38], ["in-pb", 39], ["in-rj", 40], ["in-up", 41],
          ["in-ut", 42], ["in-jh", 43],
        ];

        const options = {
          chart: {
            map: topology,
            backgroundColor: null,
            width: 650, // Increase width (optional)
    height: 450, // Increase height (optional)
          },
          title: {
            text: null, // Removes the main chart title
          },
          subtitle: {
            text: null, // Removes the subtitle
          },
          
          series: [
            {
              data: data,
              name: "Random data",
              states: {
                hover: {
                  color: "#3C50E0",
                },
              },
              dataLabels: {
                enabled: true,
                format: "{point.name}",
                style: {
                  fontSize: "10px", // Smaller labels
                },
                distance: -10, 
              },
            },
          ],
        };

        const container = document.getElementById(containerId);
        if (container) {
          Highcharts.mapChart(container, options);
        }
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };

    fetchMapData();
  }, [containerId]);

  return null;
};

const MapOne: React.FC = () => {
  const mapContainerId = "mapOne";

  return (
    <div className="border-stroke px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark col-span-12 rounded-sm border bg-white py-6 xl:col-span-7">
      <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
        Region labels
      </h4>
      <div className="h-90">
        <div id={mapContainerId} className="mapOne map-btn"></div>
      </div>
      {/* Render IndiaMapChart and pass the container ID */}
      <IndiaMapChart containerId={mapContainerId} />
    </div>
  );
};

export default MapOne;
