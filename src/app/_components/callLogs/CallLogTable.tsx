"use client";
import React from "react";
const CallLogTable = ({ callLogs }) => {

  return (
    <div className="w-full p-4">
      <div className="overflow-x-auto">
        <table className="w-full overflow-hidden rounded-lg bg-white shadow-md dark:bg-boxdark">
          <thead className="border-b bg-gray-200 dark:border-strokedark dark:bg-boxdark">
            <tr>
            {/* <th className="text-md px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500 dark:text-white">
                Customer Id
              </th>
              <th className="text-md px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500 dark:text-white">
                Agent Id
              </th>
              <th className="text-md px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500 dark:text-white">
                Campaign Id
              </th> */}
              <th className="text-md px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500 dark:text-white">
                Start Time
              </th>
              <th className="text-md px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500 dark:text-white">
                End Time
              </th>
              <th className="text-md px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500 dark:text-white">
                Duration (seconds)
              </th>
              <th className="text-md px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500 dark:text-white">
                Call Status
              </th>
              <th className="text-md px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500 dark:text-white">
                Disposition
              </th>

              {/* <th className="text-md px-6 py-3 text-right font-medium uppercase tracking-wider text-gray-500 dark:text-white">
                Actions
              </th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {callLogs.map((log, index) => (
              <tr
                key={index}
                className="transition-colors duration-200 dark:hover:bg-slate-600"
              >
                {/* <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  {log.customerId}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  {log.agentId}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  {log.campaignId}
                </td> */}
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  {log.startTime}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-white">
                  {log.endTime}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-white">
                  {log.duration}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-white">
                  {log.callStatus.charAt(0).toUpperCase() +
                    log.callStatus.slice(1)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-white">
                  {log.disposition.charAt(0).toUpperCase() +
                    log.disposition.slice(1)}
                </td>
                {/* <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <button
                    className="ml-4 text-red-600 transition hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                    onClick={() => handleDeleteCallLog(log._id)}
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CallLogTable;
