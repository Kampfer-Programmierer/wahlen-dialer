import React from "react";

type Campaign = {
  id: number;
  title: string;
};

const PausedCampaign: React.FC = () => {
  // Mock data for paused campaigns
  const pausedCampaigns: Campaign[] = [
    { id: 1, title: " Campaign 1" },
    { id: 2, title: " Campaign 2" },
    { id: 3, title: " Campaign 3" },
    { id: 4, title: " Campaign 4" },
    { id: 5, title: " Campaign 5" },
    { id: 6, title: " Campaign 6" },
  ];

  return (
    <div className="mt-4 p-4 w-96 bg-gray-100 dark:bg-boxdark dark:text-white rounded-md">
      <h3 className="text-lg font-bold mb-2">Paused Campaigns</h3>
      <ul className="list-disc pl-6">
        {pausedCampaigns.map((campaign) => (
          <li key={campaign.id} className="mb-2 font-medium">
            {campaign.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PausedCampaign;
