"use client";
import Link from "next/link";
import { useEffect, useState } from "react";


const TotalAgents = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/agents/all");
        const data = await response.json();
        setAgents(data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Agents
      </h4>

      <div>
        {agents?.map((agent, key) => (
          <Link
            href="/"
            className="flex items-center gap-5 px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 text-2xl font-bold text-gray-500">
              {agent.name
                .split(" ")
                .map((namePart) => namePart.charAt(0).toUpperCase())
                .join("")}
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-white">
                  {agent.name}
                </h5>
              </div>
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TotalAgents;
