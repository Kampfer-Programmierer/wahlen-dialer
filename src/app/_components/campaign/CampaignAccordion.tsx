"use client";

import { ActivityIcon, CheckCircleIcon, ClockIcon, PauseIcon } from 'lucide-react';
import React, { useState } from 'react';
import ActiveCampaign from './ActiveCampaign';
import PendingCampaign from './PendingCampaign';
import CompleteCampaign from './CompleteCampaign';
import PausedCampaign from './PauseCampaign';

type Campaign = {
  id: number;
  title: string;
  description: string;
};


const CampaignAccordion: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);


  const toggleAccordion = () => {
    setIsExpanded((prev) => !prev);
  };

  const singleCampaign: Campaign = {
    id: 1,
    title: 'Campaign A',
  };


  const statusData: CampaignStatus[] = [
    {
      id: 1,
      title: "Active",
      count: 25,
      bgColor: "bg-green-500",
      icon: ActivityIcon
    },
    {
      id: 2,
      title: "Pending",
      count: 15,
      bgColor: "bg-yellow-500",
      icon: ClockIcon
    },
    {
      id: 3,
      title: "Paused",
      count: 8,
      bgColor: "bg-blue-500",
      icon: PauseIcon
    },
    {
      id: 4,
      title: "Complete",
      count: 40,
      bgColor: "bg-gray-500",
      icon: CheckCircleIcon
    },
  ];

  const campaignData = {
    Active: ["Campaign 1", "Campaign 2", "Campaign 3"],
    Pending: ["Campaign 4", "Campaign 5"],
    Complete: ["Campaign 6", "Campaign 7", "Campaign 8", "Campaign 9"],
  };

  return (
    <div className="w-full   mb-3   mx-auto mt-8">
      <div className=" w-full border dark:border-boxdark rounded-md my-2 overflow-hidden">
        <button
          onClick={toggleAccordion}
          className="w-full flex justify-between text-md px-6 py-3 text-left font-medium uppercase tracking-wider items-center  dark:bg-boxdark dark:text-white dark:border-strokedark  bg-gray-200"
        >
          <span>{singleCampaign.title}</span>
          <svg
            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : 'rotate-0'
              }`}

            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isExpanded && (
          <div className="flex gap-4 w-full dark:bg-form-input pl-5 mx-auto py-2">
            {statusData.map((status) => (
              <div
                key={status.id}
                onClick={() => setSelectedStatus(status.title)}
                className={`flex flex-col  items-center w-[120px] h-[150px] justify-center p-6 rounded-lg text-white shadow-md cursor-pointer   ${!selectedStatus ? 'opacity-100 blur-0 ' : status.title === selectedStatus ? "opacity-100 blur-0 " : "opacity-30 blur-sm hover:opacity-100 hover:blur-0"
                  }  ${status.bgColor}`}
              >
                <status.icon size={36} className="mb-2" />
                <span className="text-3xl font-extrabold">{status.count}</span>
                <p className="text-xm">{status.title}</p>
              </div>
            ))}
            {selectedStatus === "Active" && <ActiveCampaign />}
            {selectedStatus === "Pending" && <PendingCampaign />}
            {selectedStatus === "Complete" && <CompleteCampaign />}
            {selectedStatus === "Paused" && <PausedCampaign />}
          </div>
        )}

      </div>
    </div>
  );
};

export default CampaignAccordion;
