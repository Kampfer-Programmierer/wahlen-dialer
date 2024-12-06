import React from "react";

type Campaign = {
  id: number;
  name: string;
  startDate: string;
  closingDate: string;
};

const PendingCampaign: React.FC = () => {
  // Mock data for pending campaigns
  const pendingCampaigns: Campaign[] = [
    { id: 1, name: "Campaign Alpha", startDate: "2025-12-08", closingDate: "2024-12-15" },
    { id: 2, name: "Campaign Beta", startDate: "2025-01-20", closingDate: "2025-02-10" },
    { id: 3, name: "Campaign Gamma", startDate: "2025-02-05", closingDate: "2025-03-20" },
    { id: 4, name: "Campaign Delta", startDate: "2025-08-25", closingDate: "2025-09-05" },
  ];

  // Sort campaigns by closing date
  const today = new Date();

  // Filter and sort campaigns
  const sortedCampaigns = pendingCampaigns
    .filter((campaign) => new Date(campaign.closingDate) >= today) // Upcoming campaigns
    .sort((a, b) => new Date(a.closingDate).getTime() - new Date(b.closingDate).getTime())
    .concat(
      pendingCampaigns
        .filter((campaign) => new Date(campaign.closingDate) < today) // Past campaigns
        .sort((a, b) => new Date(a.closingDate).getTime() - new Date(b.closingDate).getTime())
    );


  return (
    <div className="mt-4 p-4 bg-gray-100 dark:bg-boxdark dark:text-white rounded-md">
      <h3 className="text-lg font-bold mb-4">Pending Campaigns</h3>
      <ul className="space-y-4">
        {sortedCampaigns.map((campaign) => (
          <li
            key={campaign.id}
            className="p-4 rounded-md"
          >
            <h4 className="text-xl font-semibold">{campaign.name}</h4>
            <div className="flex justify-between">
              <p className="text-sm text-black pr-20 dark:text-gray-400">
                Start Date: {campaign.startDate}
              </p>
              <p className="text-sm text-black dark:text-gray-400">
                Closing Date: {campaign.closingDate}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingCampaign;
