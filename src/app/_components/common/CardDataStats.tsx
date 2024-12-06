import {
  Check,
  ListOrdered,
  Phone,
  PhoneIncoming,
  PhoneOff,
  UserCheck,
  Users2,
  X,
} from "lucide-react";
import React from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  onClick?: () => void;
  isActive?: boolean;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  onClick,
  isActive = false,
}) => {
  const getCardColors = () => {
    switch (title) {
      case "Calls Missed":
        return isActive ? "bg-red-500" : "bg-red-300";
      case "Calls Ringing":
        return isActive ? "bg-yellow-500" : "bg-yellow-300";
      case "Calls in queue":
        return isActive ? "bg-blue-500" : "bg-blue-300";
      case "Active Agents":
        return isActive ? "bg-green-500" : "bg-green-300";
      case "Total Agents":
        return isActive ? "bg-indigo-500" : "bg-indigo-300";
      case "Total Calls":
        return isActive ? "bg-cyan-500" : "bg-cyan-300";
      case "Total Missed Calls":
        return isActive ? "bg-rose-500" : "bg-rose-300";
      case "Successfull Calls":
        return isActive ? "bg-emerald-500" : "bg-emerald-300";
      default:
        return isActive ? "bg-gray-500" : "bg-gray-300";
    }
  };

  const getIcon = () => {
    switch (title) {
      case "Calls Missed":
        return <PhoneOff className="text-black dark:text-white" />;
      case "Calls Ringing":
        return <PhoneIncoming className="text-black dark:text-white" />;
      case "Calls in queue":
        return <ListOrdered className="text-black dark:text-white" />;
      case "Active Agents":
        return <UserCheck className="text-black dark:text-white" />;
      case "Total Agents":
        return <Users2 className="text-black dark:text-white" />;
      case "Total Calls":
        return <Phone className="text-black dark:text-white" />;
      case "Total Missed Calls":
        return <X className="text-black dark:text-white" />;
      case "Successfull Calls":
        return <Check className="text-black dark:text-white" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex flex-col items-center rounded-lg border border-stroke px-6.5 py-5 shadow-default transition-all duration-300 hover:cursor-pointer dark:border-none ${getCardColors()} text-black`}
      onClick={onClick}
    >
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full border-meta-4 bg-meta-2 dark:bg-meta-4">
        {getIcon()}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-center text-title-md font-bold text-black">
            {total}
          </h4>
          <span className="whitespace-nowrap text-sm font-medium">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
