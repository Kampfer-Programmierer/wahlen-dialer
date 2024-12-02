import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Campaign {
  id: string;
  name: string;
  status: string
  description: string;
  startDate: string;
  endDate: string;
  callScript: string
}

interface CampaignsResponse {
  campaigns: Campaign[];
  currentPage: number;
  totalPages: number;
}

// Fetch paginated campaigns
export const fetchCampaigns = async ({ page, limit }: { page: number; limit: number }): Promise<CampaignsResponse> => {
  const response = await fetch(`/api/campaigns?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch campaigns data');
  }
  return response.json();
};

// Add a new campaign
const addCampaign = async (newCampaign: Omit<Campaign, 'id'>): Promise<Campaign> => {
  const response = await fetch('/api/campaigns', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCampaign),
  });
  if (!response.ok) {
    throw new Error('Failed to add campaign');
  }
  return response.json();
};

// Delete a campaign
const deleteCampaign = async (id: string): Promise<void> => {
  const response = await fetch(`/api/campaigns/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete campaign');
  }
};

export const useCampaigns = (page: number, limit: number) => {
  const queryClient = useQueryClient();

  // Fetch campaigns
  const query = useQuery({
    queryKey: ['campaigns', page], // Unique query key for campaigns
    queryFn: () => fetchCampaigns({ page, limit }), // Query function for campaigns
    keepPreviousData: true,
  });

  // Add campaign mutation
  const addMutation = useMutation({
    mutationFn: addCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] }); // Invalidate campaigns query
    },
  });

  // Delete campaign mutation
  const deleteMutation = useMutation({
    mutationFn: deleteCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] }); // Refresh the campaigns query
    },
  });

  return {
    query, // Query data, loading, error
    addMutation, // Add campaign mutation
    deleteMutation, // Delete campaign mutation
  };
};
