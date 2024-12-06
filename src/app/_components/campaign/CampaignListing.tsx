"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCampaigns } from "~/app/hooks/useCampaigns";
import CampaignAccordion from "./CampaignAccordion";

const getStatusClasses = (status) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "paused":
      return "bg-yellow-100 text-yellow-800";
    case "completed":
      return "bg-blue-100 text-blue-800";
    case "inactive":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const CampaignListing = ({ page: initialPage, limit }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(initialPage);

  const { query, deleteMutation } = useCampaigns(
    page,
    limit,
  );

  const { data, isLoading, isError } = query;
  const { campaigns, currentPage, totalPages } = data?.data || {};

  const router = useRouter();

  if (isLoading) return <div>Loading camapigns...</div>;
  if (isError) return <div>Error fetching campaigns</div>;

  const handleUpdateCampaign = (id) => {
    router.push(`/campaigns/add?id=${id}`);
  };

  const handleDeleteCampaign = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="w-full p-4">
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search Campaign..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/2 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        <Link
          href={"/campaigns/add"}
          className="rounded-lg bg-primary px-6 py-3 font-medium text-gray hover:bg-opacity-90"
        >
          Add Campaign
        </Link>
      </div>
      <CampaignAccordion />
      <div className="overflow-x-auto">
        <table className="w-full overflow-hidden rounded-lg bg-white shadow-md dark:bg-boxdark">
          <thead className="border-b bg-gray-200 dark:border-strokedark dark:bg-boxdark">
            <tr>
              <th className="text-md px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500 dark:text-white">
                Name
              </th>
              <th className="text-md px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500 dark:text-white">
                Start Date
              </th>
              <th className="text-md px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500 dark:text-white">
                End Date
              </th>
              <th className="text-md px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500 dark:text-white">
                Status
              </th>
              <th className="text-md px-10 py-3 text-right  font-medium uppercase tracking-wider text-gray-500 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {campaigns.map((campaign, index) => (
              <tr
                key={index}
                className="transition-colors duration-200 dark:hover:bg-slate-600"
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  {campaign.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-white">
                  {new Date(campaign.startDate).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-white">
                  {new Date(campaign.endDate).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold leading-5 ${getStatusClasses(campaign.status)}`}
                  >
                    {campaign.status.charAt(0).toUpperCase() +
                      campaign.status.slice(1)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <button
                    className="text-blue-600 transition hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600"
                    onClick={() => handleUpdateCampaign(campaign._id)}
                  >
                    Update
                  </button>
                  <button
                    className="ml-4 text-red-600 transition hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                    onClick={() => handleDeleteCampaign(campaign._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignListing;
