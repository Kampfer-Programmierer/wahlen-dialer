import { ListOrdered, PhoneIncoming, PhoneOff, UserCheck, Users2 } from "lucide-react";
import React from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  onClick: () => void;
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
        return isActive ? "bg-red-400" : "bg-red-300";
      case "Calls Ringing":
        return isActive ? "bg-yellow-400" : "bg-yellow-300";
      case "Calls in queue":
        return isActive ? "bg-blue-400" : "bg-blue-300";
      case "Active Agents":
        return isActive ? "bg-green-400" : "bg-green-300";
      case "Total Agents":
        return isActive ? "bg-purple-400" : "bg-purple-300";
      default:
        return isActive ? "bg-gray-400" : "bg-gray-300";
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
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex flex-col items-center rounded-lg border border-stroke dark:border-none px-6.5 py-5 shadow-default transition-all duration-300 hover:cursor-pointer ${getCardColors()} text-black`}
      onClick={onClick}
    >
      <div className="flex h-11.5 w-11.5 items-center border-meta-4  justify-center rounded-full bg-meta-2 dark:bg-meta-4">
      {getIcon()}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-center text-title-md font-bold text-black ">
            {total}
          </h4>
          <span className="whitespace-nowrap text-sm font-medium">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
