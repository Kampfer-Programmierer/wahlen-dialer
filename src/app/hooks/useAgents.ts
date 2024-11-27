import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Agent {
  id: string;
  name: string;
  email: string;
}

interface AgentsResponse {
  agents: Agent[];
  currentPage: number;
  totalPages: number;
}

// Fetch paginated agents
export const fetchAgents = async ({ page, limit }: { page: number; limit: number }): Promise<AgentsResponse> => {
  const response = await fetch(`/api/agents?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch agents data');
  }
  return response.json();
};

// Add a new agent
const addAgent = async (newAgent: Omit<Agent, 'id'>): Promise<Agent> => {
  const response = await fetch('/api/agents', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAgent),
  });
  if (!response.ok) {
    throw new Error('Failed to add agent');
  }
  return response.json();
};

const deleteAgent = async (id: string): Promise<void> => {
  const response = await fetch(`/api/agents/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete agent');
  }
};

export const useAgents = (page: number, limit: number) => {
  const queryClient = useQueryClient();

  // Fetch agents
  const query = useQuery({
    queryKey: ['agents', page], // Use array format for the query key
    queryFn: () => fetchAgents({ page, limit }), // Use an object for queryFn arguments
    keepPreviousData: true,
  });

  // Add agent mutation
  const addMutation = useMutation({
    mutationFn: addAgent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] }); // Invalidate agents query
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAgent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] }); // Refresh the agents query
    },
  });

  return {
    query, // Query data, loading, error
    addMutation, // Add agent mutation
    deleteMutation
  };
};
