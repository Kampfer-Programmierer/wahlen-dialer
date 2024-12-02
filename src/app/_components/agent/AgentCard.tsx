"use client";
import React from "react";

interface Agent {
  _id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  num: string;
  assignedCampaigns: string[];
}

interface AgentCardProps {
  agent: Agent;
  onUpdate: (agent: { id: string }) => void;
  onDelete: (id: string) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onUpdate, onDelete }) => {
  return (
    <div className="relative w-full max-w-sm transform rounded-xl bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-gray-800">
      {/* Status Indicator */}
      <div className="absolute right-4 top-4">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider ${
            agent.status.toLowerCase() === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {agent.status}
        </span>
      </div>

      {/* Profile Section */}
      <div className="mb-6 flex flex-col items-center">
        <div className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-gray-200 shadow-md">
          <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-gray-500">
            {agent.name
              .split(" ")
              .map((namePart) => namePart.charAt(0).toUpperCase())
              .join("")}
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {agent.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {agent.role}
          </p>
        </div>
      </div>

      {/* Contact and Details */}
      <div className="space-y-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <a
              href={`mailto:${agent.email}`}
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              {agent.email}
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {agent.num}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <div className="flex flex-wrap gap-1">
            {agent.assignedCampaigns.length > 0 ? (
              agent.assignedCampaigns.map((campaign, index) => (
                <span
                  key={index}
                  className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800"
                >
                  {campaign}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-500">No campaigns</span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => onUpdate(agent)}
          className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Update Profile
        </button>
        <button
          onClick={() => onDelete(agent._id)}
          className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Remove Agent
        </button>
      </div>
    </div>
  );
};

export default AgentCard;
