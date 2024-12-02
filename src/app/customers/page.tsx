import { QueryClient, dehydrate } from '@tanstack/react-query'
import { HydrationBoundary } from '@tanstack/react-query'
import {fetchCustomers} from '../hooks/useCustomers'
import CustomerTable from "../_components/customer/customerTable";


const CustomerPage = async() => {
  const queryClient = new QueryClient();
  const page = 1; // Default page
  const limit = 10; // Default limit

  // Prefetch agents' data on the server
  await queryClient.prefetchQuery({
    queryKey: ['customers', page],
    queryFn: () => fetchCustomers({ page, limit }), // Pass arguments as an object
  });

  // Dehydrate the queryClient to pass to the client
  const dehydratedState = dehydrate(queryClient);

  return(
    <div>
      <HydrationBoundary state={dehydratedState}>
        <CustomerTable page={page} limit={limit} />
      </HydrationBoundary>
    </div>
  )
};

export default CustomerPage;
