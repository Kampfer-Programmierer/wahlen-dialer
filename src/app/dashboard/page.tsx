"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import ChartOne from "~/app/_components/common/Charts/ChartOne";
import ChartTwo from "~/app/_components/common/Charts/ChartTwo";
import TableOne from "~/app/_components/common/Tables/TableOne";
import CardDataStats from "~/app/_components/common/CardDataStats";
import DashboardAgentCard from "~/app/_components/common/Agent/DashboardAgentCard";
import MissedCall from "../_components/dashboard/MissedCall";
import RingingCalls from "../_components/dashboard/RingingCalls";
import CallsInQueue from "../_components/dashboard/CallsInQueue";
import TotalAgents from "../_components/dashboard/TotalAgents";
import ActiveAgents from "../_components/dashboard/ActiveAgents";

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
    "Total Agents": <TotalAgents />,
    "Active Agents": <ActiveAgents />,
  };

  const renderMainContent = () => {
    return detailComponents[selectedView] || <TableOne />;
  };

  return (
    <>
      {/* CARDS */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
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
                    : title === "Total Agents"
                      ? "24"
                      : title === "Active Agents"
                        ? "20"
                        : ""
            }
            isActive={selectedView === title}
            onClick={() => setSelectedView(title)}
          />
        ))}
      </div>

      <div className="2xl:mt-7.5 2xl:gap-7.5 mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6">
        <div className="col-span-12 xl:col-span-8">{renderMainContent()}</div>
        <DashboardAgentCard />
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
      </div>
    </>
  );
};

export default Dashboard;
