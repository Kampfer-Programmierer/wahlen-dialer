
import Link from 'next/link';
import React from 'react';

const campaignsData = [
  {
    "name": "Campaign Alpha",
    "status": "active",
    "startDate": "2024-11-01T08:00:00Z",
    "endDate": "2024-11-30T17:00:00Z",
    "assignedAgents": ["648a1234567f890123456789", "648a9876543f210123456789"]
  },
  {
    "name": "Campaign Beta",
    "status": "paused",
    "startDate": "2024-10-15T09:00:00Z",
    "endDate": "2024-12-15T18:00:00Z",
    "assignedAgents": ["648b1234567f890123456789"]
  },
  {
    "name": "Campaign Gamma",
    "status": "completed",
    "startDate": "2024-08-01T10:00:00Z",
    "endDate": "2024-10-01T16:00:00Z",
    "assignedAgents": ["648c1234567f890123456789", "648c9876543f210123456789", "648d1234567f890123456789"]
  },
  {
    "name": "Campaign Delta",
    "status": "inactive",
    "startDate": "2024-11-10T11:00:00Z",
    "endDate": "2025-01-10T15:00:00Z",
    "assignedAgents": []
  }
];

const getStatusClasses = (status) => {
  switch(status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'paused': return 'bg-yellow-100 text-yellow-800';
    case 'completed': return 'bg-blue-100 text-blue-800';
    case 'inactive': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const CampaignTable = () => {
  return (
    <div className="p-4 w-full">
       <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search Campaign..."
          // value={searchQuery}
          // onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/2 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        <Link
          href={"/campaigns/add"}
          className="rounded-lg bg-primary px-6 py-3 font-medium text-gray hover:bg-opacity-90"
        >
           Add Campaign
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white  dark:bg-boxdark shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 border-b dark:border-strokedark dark:bg-boxdark">
            <tr>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-500 dark:text-white uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-500 dark:text-white uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-500 dark:text-white uppercase tracking-wider">End Date</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-500 dark:text-white uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {campaignsData.map((campaign, index) => (
              <tr key={index} className="dark:hover:bg-slate-600 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white text-gray-900">
                  {campaign.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                  {new Date(campaign.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                  {new Date(campaign.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5  font-semibold rounded-full ${getStatusClasses(campaign.status)}`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignTable;