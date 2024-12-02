import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface CustomersResponse {
  customers: Customer[];
  currentPage: number;
  totalPages: number;
}

// Fetch paginated customers
export const fetchCustomers = async ({ page, limit }: { page: number; limit: number }): Promise<CustomersResponse> => {
  const response = await fetch(`/api/customers?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch customers data');
  }
  return response.json();
};

// Update a customer
const updateCustomer = async (updatedCustomer: Customer): Promise<Customer> => {
  const response = await fetch(`/api/customers/${updatedCustomer.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedCustomer),
  });
  if (!response.ok) {
    throw new Error('Failed to update customer');
  }
  return response.json();
};

// Delete a customer
const deleteCustomer = async (id: string): Promise<void> => {
  const response = await fetch(`/api/customers/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete customer');
  }
};

const useCustomers = (page: number, limit: number) => {
  const queryClient = useQueryClient();

  // Fetch customers
  const query = useQuery({
    queryKey: ['customers', page], // Unique query key for customers
    queryFn: () => fetchCustomers({ page, limit }), // Query function for customers
    keepPreviousData: true,
  });

  // Update customer mutation
  const updateMutation = useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] }); // Refresh the customers query
    },
  });

  // Delete customer mutation
  const deleteMutation = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] }); // Refresh the customers query
    },
  });

  return {
    query, // Query data, loading, error
    updateMutation, // Update customer mutation
    deleteMutation, // Delete customer mutation
  };
};

export default useCustomers
