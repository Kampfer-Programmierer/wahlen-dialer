import Image from "next/image";

export type RINGING_CALL = {
  number: string; // Phone number associated with the call.

  ringingDuration: string; // Average ringing time.
  callType: string; // Type of call (e.g., Inbound, Outbound).
  priority: string; // Priority of the call.
  status: string; // Current status (e.g., Active, Waiting).
};

const ringingCallData: RINGING_CALL[] = [
  {
    number: "+91-8264799780",
    ringingDuration: "00:45",
    callType: "Inbound",
    priority: "High",
    status: "Active",
  },
  {
    number: "+91-2632703084",
    ringingDuration: "01:20",
    callType: "Outbound",
    priority: "Medium",
    status: "Waiting",
  },
  {
    number: "+91-2662218614",
    ringingDuration: "00:35",
    callType: "Inbound",
    priority: "Low",
    status: "Active",
  },
  {
    number: "+91-0638360959",
    ringingDuration: "01:05",
    callType: "Outbound",
    priority: "High",
    status: "Waiting",
  },
  {
    number: "+91-2531611862",
    ringingDuration: "00:50",
    callType: "Inbound",
    priority: "Medium",
    status: "Active",
  },
];

const RingingCalls = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Ringing Calls Overview
      </h4>

      <div className="flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Number
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Duration
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Call Type
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
        {ringingCallData.map((call, index) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              index === ringingCallData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={index}
          >
            {/* Phone Number */}
            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{call.number}</p>
            </div>

            {/* Ringing Duration */}
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {call.ringingDuration}
              </p>
            </div>

            {/* Call Type */}
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-3">{call.callType}</p>
            </div>

            {/* Priority */}
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{call.priority}</p>
            </div>

            {/* Status */}
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{call.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RingingCalls;
