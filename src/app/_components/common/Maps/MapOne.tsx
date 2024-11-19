"use client";
import React, { useEffect } from "react";

const MapOne: React.FC = () => {
  useEffect(() => {
    return () => {
      const map = document.getElementById("mapOne");
      if (map) {
        map.innerHTML = "";
      }
      // mapOne.destroy();
    };
  }, []);

  return (
    <div className="border-stroke px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark col-span-12 rounded-sm border bg-white py-6 xl:col-span-7">
      <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
        Region labels
      </h4>
      <div className="h-90">
        <div id="mapOne" className="mapOne map-btn"></div>
      </div>
    </div>
  );
};

export default MapOne;
