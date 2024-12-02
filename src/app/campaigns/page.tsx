import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";

import { fetchCampaigns } from "../hooks/useCampaigns";
import CampaignListing from "../_components/campaign/CampaignListing";

const campaignsData = [
  {
    name: "Campaign Alpha",
    status: "active",
    startDate: "2024-11-01T08:00:00Z",
    endDate: "2024-11-30T17:00:00Z",
    assignedAgents: ["648a1234567f890123456789", "648a9876543f210123456789"],
  },
  {
    name: "Campaign Beta",
    status: "paused",
    startDate: "2024-10-15T09:00:00Z",
    endDate: "2024-12-15T18:00:00Z",
    assignedAgents: ["648b1234567f890123456789"],
  },
  {
    name: "Campaign Gamma",
    status: "completed",
    startDate: "2024-08-01T10:00:00Z",
    endDate: "2024-10-01T16:00:00Z",
    assignedAgents: [
      "648c1234567f890123456789",
      "648c9876543f210123456789",
      "648d1234567f890123456789",
    ],
  },
  {
    name: "Campaign Delta",
    status: "inactive",
    startDate: "2024-11-10T11:00:00Z",
    endDate: "2025-01-10T15:00:00Z",
    assignedAgents: [],
  },
];

const CampaignTable = async () => {
  const queryClient = new QueryClient();
  const page = 1; // Default page
  const limit = 10; // Default limit

  // Prefetch agents' data on the server
  await queryClient.prefetchQuery({
    queryKey: ["campaigns", page],
    queryFn: () => fetchCampaigns({ page, limit }), // Pass arguments as an object
  });

  // Dehydrate the queryClient to pass to the client
  const dehydratedState = dehydrate(queryClient);
  return (
    <div>
      <HydrationBoundary state={dehydratedState}>
        <CampaignListing page={page} limit={limit} />
      </HydrationBoundary>
    </div>
  );
};

export default CampaignTable;
