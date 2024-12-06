import React from "react";
import { Phone, CheckCircle, Clock } from "lucide-react";

type CallData = {
  title: string;
  count: number;
  bgColor: string;
  Icon: React.ComponentType<{ size: number, color?: string }>;
};

const ActiveCampaign: React.FC = () => {
  const callData: CallData[] = [
    {
      title: "Total Calls",
      count: 50,
      bgColor: "bg-indigo-600",
      Icon: Phone
    },
    {
      title: "Success Calls",
      count: 30,
      bgColor: "bg-emerald-600",
      Icon: CheckCircle
    },
    {
      title: "Pending Calls",
      count: 20,
      bgColor: "bg-amber-600",
      Icon: Clock
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 ">
      {callData.map((call, index) => (
        <div
          key={index}
          className={`flex flex-col items-center w-[120px] h-[150px] justify-center   rounded-lg text-white shadow-md ${call.bgColor} `}
        >
          <call.Icon size={36} className="mb-3" />
          <span className="text-3xl font-bold">{call.count}</span>
          <p className="text-lg font-medium">{call.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ActiveCampaign;