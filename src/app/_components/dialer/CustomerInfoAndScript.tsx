"use client";
import React, { useState } from "react";

interface Customer {
  name: string;
  phone: string;
  email: string;
  location: string;
  priority: string;
  status?: string;
  notes?: string;
}

interface CampaignScript {
  greeting: string;
  introduction: string;
  keyPoints: string[];
  faqs: { question: string; answer: string }[];
  closing: string;
}

interface SimplifiedOutgoingCallDialerProps {
  customer?: Customer; // Make the customer prop optional
  campaignScript: CampaignScript;
}

export default function CustomerInfoAndScript({
  customer = {
    name: "Name",
    phone: "Phone Number",
    email: "Email",
    location: "Location",
    priority: "Priority",
    status: "Status",
    notes: "Notes",
  },
  campaignScript,
}: SimplifiedOutgoingCallDialerProps) {
  const [activeTab, setActiveTab] = useState("caller");

  return (
    <div className="x p-6 bg-gray-100 dark:bg-boxdark">
      <div className="mb-4">
        <button
          onClick={() => setActiveTab("caller")}
          className={`px-4 py-2 rounded-l-md font-semibold ${
            activeTab === "caller"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:text-boxdark"
          }`}
        >
          Caller Screen
        </button>
        <button
          onClick={() => setActiveTab("script")}
          className={`px-4 py-2 rounded-r-md font-semibold ${
            activeTab === "script"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:text-boxdark"
          }`}
        >
          Script
        </button>
      </div>

      {activeTab === "caller" && (
        <div className="bg-white dark:bg-strokedark p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 dark:text-white">
            Customer Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Name", value: customer.name },
              { label: "Phone Number", value: customer.phone },
              { label: "Email", value: customer.email },
              { label: "Location", value: customer.location },
              { label: "Priority", value: customer.priority },
            ].map((field, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {field.label}
                </label>
                <input
                  type="text"
                  value={field.value}
                  readOnly
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:border-form-strokedark dark:bg-form-input text-black-2 dark:text-white px-2 py-1"
                />
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold mt-6 mb-4 dark:text-white">
            Call History
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Previous Call Status
            </label>
            <input
              type="text"
              value={customer.status}
              readOnly
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:border-form-strokedark text-black-2 dark:bg-form-input dark:text-white px-2 py-1"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Previous Notes
            </label>
            <textarea
              value={customer.notes}
              readOnly
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm dark:border-form-strokedark dark:bg-form-input text-black-2 dark:text-white"
              rows={2}
            />
          </div>
        </div>
      )}

      {activeTab === "script" && (
        <div className="bg-white p-6 rounded-lg shadow dark:bg-strokedark">
          <h2 className="text-xl font-bold mb-4 dark:text-gray-300">
            Campaign Script
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold dark:text-gray-300">Greeting</h3>
              <p className="dark:text-white text-black-2">
                {campaignScript.greeting}
              </p>
            </div>
            <div>
              <h3 className="font-bold dark:text-gray-300">Introduction</h3>
              <p className="dark:text-white text-black-2">
                {campaignScript.introduction}
              </p>
            </div>
            <div>
              <h3 className="font-bold dark:text-gray-300">Key Points</h3>
              <ul className="list-disc list-inside">
                {campaignScript.keyPoints.map((point, index) => (
                  <li className="dark:text-white text-black-2" key={index}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold dark:text-gray-300">FAQs</h3>
              {campaignScript.faqs.map((faq, index) => (
                <div key={index} className="mb-2">
                  <p className="font-semibold dark:text-gray-300">
                    {faq.question}
                  </p>
                  <p className="dark:text-white text-black-2">{faq.answer}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-bold dark:text-gray-300">Closing</h3>
              <p className="dark:text-white text-black-2">
                {campaignScript.closing}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
