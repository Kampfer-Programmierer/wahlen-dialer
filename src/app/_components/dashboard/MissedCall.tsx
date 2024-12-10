import Image from "next/image";

export type MISSED_CALL = {
  agents: string; // Name of the brand/source.
  missedCalls: number; // Number of missed calls.
  avgResponseTime: string; // Average time taken to respond to missed calls.
  recoveryRate: number; // Percentage of successful callbacks or recoveries.
  reason: string; // Common reason for missed calls.
};

const missedCallData: MISSED_CALL[] = [
  {
    agents: "Customer service representative",
    missedCalls: 35,
    avgResponseTime: "3h 45m",
    recoveryRate: 75,
    reason: "Busy Line",
  },
  {
    agents: "Customer care representative",
    missedCalls: 22,
    avgResponseTime: "2h 30m",
    recoveryRate: 65,
    reason: "No Answer",
  },
  {
    agents: "Telephone sales",
    missedCalls: 18,
    avgResponseTime: "4h 10m",
    recoveryRate: 80,
    reason: "Network Issues",
  },
  {
    agents: "Account executive",
    missedCalls: 12,
    avgResponseTime: "1h 20m",
    recoveryRate: 50,
    reason: "Voicemail",
  },
  {
    agents: "Team member",
    missedCalls: 40,
    avgResponseTime: "5h 15m",
    recoveryRate: 60,
    reason: "User Busy",
  },
];

const MissedCall = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Missed Calls Overview
      </h4>

      <div className="flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Agents
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Missed Calls
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Avg Response
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Recovery Rate
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Reason
            </h5>
          </div>
        </div>

        {/* Table Rows */}
        {missedCallData.map((call, index) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              index === missedCallData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={index}
          >
            {/* Source */}
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {call.agents}
              </p>
            </div>

            {/* Missed Calls */}
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{call.missedCalls}</p>
            </div>

            {/* Avg Response Time */}
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{call.avgResponseTime}</p>
            </div>

            {/* Recovery Rate */}
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{call.recoveryRate}%</p>
            </div>

            {/* Reason */}
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{call.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissedCall;
