import Image from "next/image";

export type QUEUED_CALL = {
  callerName: string;
  phoneNumber: string;
  waitTime: string;
  queuePriority: string;
  status: string;
};

const queuedCallData: QUEUED_CALL[] = [
  {
    callerName: "John Doe",
    phoneNumber: "+91-8264799780",
    waitTime: "02:15",
    queuePriority: "High",
    status: "Waiting",
  },
  {
    callerName: "Jane Smith",
    phoneNumber: "+91-2632703084",
    waitTime: "01:50",
    queuePriority: "Medium",
    status: "In Progress",
  },
  {
    callerName: "Michael Johnson",
    phoneNumber: "+91-2662218614",
    waitTime: "03:30",
    queuePriority: "Low",
    status: "Waiting",
  },
  {
    callerName: "Emily Davis",
    phoneNumber: "+91-0638360959",
    waitTime: "01:20",
    queuePriority: "High",
    status: "In Progress",
  },
  {
    callerName: "Sarah Wilson",
    phoneNumber: "+91-2531611862",
    waitTime: "02:45",
    queuePriority: "Medium",
    status: "Waiting",
  },
];

const CallsInQueue = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Calls in Queue
      </h4>

      <div className="flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Caller Name
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Phone Number
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Wait Time
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Priority
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
        </div>

        {/* Table Rows */}
        {queuedCallData.map((call, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === queuedCallData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            {/* Caller Info */}
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{call.callerName}</p>
            </div>

            {/* Phone Number */}
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{call.phoneNumber}</p>
            </div>

            {/* Wait Time */}
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{call.waitTime}</p>
            </div>

            {/* Priority */}
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p
                className={`text-${call.queuePriority === "High" ? "red-500" : call.queuePriority === "Medium" ? "yellow-500" : "green-500"}`}
              >
                {call.queuePriority}
              </p>
            </div>

            {/* Status */}
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p
                className={`text-${call.status === "In Progress" ? "blue-500" : "gray-500"}`}
              >
                {call.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallsInQueue;
