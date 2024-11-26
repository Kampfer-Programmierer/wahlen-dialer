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
export const fetchAgents = async (page: number, limit: number): Promise<AgentsResponse> => {
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

// Update an existing agent
const updateAgent = async (updatedAgent: Agent): Promise<Agent> => {
  const response = await fetch(`/api/agents/${updatedAgent.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAgent),
  });
  if (!response.ok) {
    throw new Error('Failed to update agent');
  }
  return response.json();
};

// Delete an agent
const deleteAgent = async (id: string): Promise<{ id: string }> => {
  const response = await fetch(`/api/agents/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Failed to delete agent');
  }
  return response.json();
};

export const useAgents = (page: number, limit: number) => {
  const queryClient = useQueryClient();

  // Query: Fetch agents
  const query = useQuery(['agents', page], () => fetchAgents(page, limit), {
    keepPreviousData: true,
  });

  // Mutation: Add agent
  const addMutation = useMutation(addAgent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['agents']); // Refetch agents
    },
  });

  // Mutation: Update agent
  const updateMutation = useMutation(updateAgent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['agents']); // Refetch agents
    },
  });

  // Mutation: Delete agent
  const deleteMutation = useMutation(deleteAgent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['agents']); // Refetch agents
    },
  });

  return {
    query, // Query data, loading, error
    addMutation, // Add agent mutation
    updateMutation, // Update agent mutation
    deleteMutation, // Delete agent mutation
  };
};
