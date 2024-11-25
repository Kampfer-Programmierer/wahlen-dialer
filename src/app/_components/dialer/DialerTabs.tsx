"use client";

import { useState } from "react";
import { Phone, User, Pause, Forward } from "lucide-react";

interface DialerTabsProps {
  onTabChange: (tab: "dialer" | "current-call") => void;
  currentCall: {
    name: string;
    company: string;
    duration: string;
  } | null;
  onEndCall: () => void;
  onOutcomeChange: (outcome: string) => void;
  onNotesChange: (notes: string) => void;
}

export function DialerTabs({
  onTabChange,
  currentCall,
  onEndCall,
  onOutcomeChange,
  onNotesChange,
}: DialerTabsProps) {
  const [activeTab, setActiveTab] = useState<"dialer" | "current-call">(
    "current-call",
  );
  const [notes, setNotes] = useState("");

  const handleTabChange = (tab: "dialer" | "current-call") => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
    onNotesChange(e.target.value);
  };

  return (
    <div className="flex flex-col dark:bg-boxdark">
      <div className="flex ">
        <button
          onClick={() => handleTabChange("current-call")}
          className={`flex items-center gap-2 font-semibold border-b-2 px-4 py-2 ${
            activeTab === "current-call"
              ? "border-blue-500 text-blue-500"
              : "border-gray-500 text-gray-500"
          }`}
        >
          <User className="h-4 w-4" />
          Current Call
        </button>
        <button
          onClick={() => handleTabChange("dialer")}
          className={`flex items-center gap-2 border-b-2 font-semibold px-4 py-2 ${
            activeTab === "dialer"
              ? "border-blue-500 text-blue-500"
              : " border-gray-500 text-gray-500"
          }`}
        >
          <Phone className="h-4 w-4" />
          Dialer
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {activeTab === "dialer" ? (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter phone number"
              className="w-full rounded-md border p-2 dark:bg-strokedark"
            />
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((num) => (
                <button
                  key={num}
                  className="rounded-full border p-4 text-center hover:bg-gray-200 dark:hover:bg-black dark:bg-strokedark dark:text-white"
                >
                  {num}
                </button>
              ))}
            </div>
            <button className="w-full rounded-md bg-green-500 p-2 text-white">
              Call
            </button>
          </div>
        ) : currentCall ? (
          <div className="space-y-4">
            <div className="rounded-md border p-4 bg-white text-center dark:border-0 dark:bg-strokedark">
              <div className="font-mono text-3xl  dark:text-gray-300">
                {currentCall.duration}
              </div>
              <div className="text-sm text-gray-500 dark:text-white">
                Current Call Duration
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-black-2 dark:text-white">Call Details</div>
              <div className="text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-black-2 dark:text-gray-300">Name</span>
                  <span className="dark:text-white text-black-2">{currentCall.name}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-black-2 dark:text-gray-300">
                    Company
                  </span>
                  <span className="dark:text-white text-black-2">{currentCall.company}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-black-2 dark:text-gray-300">
                    Status
                  </span>
                  <span className="dark:text-white text-black-2">Active</span>
                </div>
              </div>
            </div>
            <div className="flex gap-x-3">
              <button className="flex bg-white hover:bg-gray-200 w-full justify-center gap-x-1 rounded-md border p-2 text-center dark:hover:bg-black dark:bg-strokedark dark:text-white">
                <Pause />
                Hold
              </button>
              <button className="flex bg-white hover:bg-gray-200 w-full justify-center gap-x-1 rounded-md border p-2 text-center dark:hover:bg-black dark:bg-strokedark dark:text-white">
                <Forward />
                Transfer
              </button>
            </div>
            <button
              onClick={onEndCall}
              className="w-full rounded-md bg-red-500 p-2 text-white"
            >
              End Call
            </button>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Call Outcome
              </label>
              <select
                onChange={(e) => onOutcomeChange(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-strokedark dark:text-gray-300 sm:text-sm"
              >
                <option value="">Select outcome</option>
                <option value="interested">Interested</option>
                <option value="not-interested">Not Interested</option>
                <option value="callback">Callback</option>
                <option value="wrong-number">Wrong Number</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Agent Notes
              </label>
              <textarea
                value={notes}
                onChange={handleNotesChange}
                rows={4}
                className="mt-1 block w-full rounded-md border dark:text-white border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-0 dark:bg-strokedark sm:text-sm"
                placeholder="Enter call notes here..."
              />
            </div>
          </div>
        ) : (
          <div className="mt-4 text-center text-gray-500">No active call</div>
        )}
      </div>
    </div>
  );
}
