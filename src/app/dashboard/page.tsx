"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import ChartOne from "~/app/_components/common/Charts/ChartOne";
import ChartTwo from "~/app/_components/common/Charts/ChartTwo";
import TableOne from "~/app/_components/common/Tables/TableOne";
import CardDataStats from "~/app/_components/common/CardDataStats";
import MissedCall from "../_components/dashboard/MissedCall";
import RingingCalls from "../_components/dashboard/RingingCalls";
import CallsInQueue from "../_components/dashboard/CallsInQueue";
import ActiveAgents from "../_components/dashboard/ActiveAgents";
import TotalAgents from "~/app/_components/dashboard/TotalAgents";

const MapOne = dynamic(() => import("~/app/_components/common/Maps/MapOne"), {
  ssr: false,
});

const ChartThree = dynamic(
  () => import("~/app/_components/common/Charts/ChartThree"),
  {
    ssr: false,
  },
);

const Dashboard: React.FC = () => {
  const [selectedView, setSelectedView] = useState<React.ReactNode | null>(
    null,
  );

  const detailComponents: { [key: string]: React.ReactNode } = {
    "Calls Missed": <MissedCall />,
    "Calls Ringing": <RingingCalls />,
    "Calls in queue": <CallsInQueue />,
  };

  const renderMainContent = () => {
    return detailComponents[selectedView] || <TableOne />;
  };

  const renderSideContent = () => {
    if (selectedView === "Active Agents") {
      return <ActiveAgents />;
    } else if (selectedView === "Total Agents") {
      return <TotalAgents />;
    }
    return <TotalAgents />;
  };

  return (
    <>
      {/* CARDS */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        <CardDataStats title="Total Missed Calls" total="1000" />
        <CardDataStats title="Successfull Calls" total="1000" />
        <CardDataStats title="Total Calls" total="1000" />
        {Object.entries(detailComponents).map(([title, component]) => (
          <CardDataStats
            key={title}
            title={title}
            total={
              title === "Calls Missed"
                ? "5"
                : title === "Calls Ringing"
                  ? "32"
                  : title === "Calls in queue"
                    ? "5"
                    : ""
            }
            isActive={selectedView === title}
            onClick={() => setSelectedView(title)}
          />
        ))}
        <CardDataStats
          title="Active Agents"
          total="20"
          isActive={selectedView === "Active Agents"}
          onClick={() => setSelectedView("Active Agents")}
        />
        <CardDataStats
          title="Total Agents"
          total="24"
          isActive={selectedView === "Total Agents"}
          onClick={() => setSelectedView("Total Agents")}
        />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">{renderMainContent()}</div>
        {renderSideContent()}
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
      </div>
    </>
  );
};

export default Dashboard;
