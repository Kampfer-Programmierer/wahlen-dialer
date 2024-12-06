import React from "react";

type Campaign = {
  id: number;
  name: string;
  description: string;
  completedAt: string;
};

const CompleteCampaign: React.FC = () => {
  // Mock data for completed campaigns
  const completeCampaigns: Campaign[] = [
    { id: 1, name: "Campaign Alpha", description: "Description for Campaign Alpha", completedAt: "2024-12-01" },
    { id: 2, name: "Campaign Beta", description: "Description for Campaign Beta", completedAt: "2024-12-02" },
    { id: 3, name: "Campaign Gamma", description: "Description for Campaign Gamma", completedAt: "2024-12-03" },
  ];

  return (
    <div className="mt-4 p-4 bg-gray-100 dark:bg-boxdark dark:text-white rounded-md">
      <h3 className="text-lg font-bold mb-4">Complete Campaigns</h3>
      <ul className="space-y-4">
        {completeCampaigns.map((campaign) => (
          <li
            key={campaign.id}
            className="p-4  rounded-md  shadow-sm"
          >
            <h4 className="text-xl font-semibold">{campaign.name}</h4>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400 pr-20">{campaign.description}</p>
              <p className="text-sm font-light">Completed At: {campaign.completedAt}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompleteCampaign;
