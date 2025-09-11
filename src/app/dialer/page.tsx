import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'
import { fetchCustomers } from '../hooks/useCustomers';
import DialerPage from '../_components/dialer/MainDialer';

const Dialer = async() => {
  const queryClient = new QueryClient();
  const page = 1; // Default page
  const limit = 4; // Default limit

  // Prefetch agents' data on the server
  await queryClient.prefetchQuery({
    queryKey: ['customers', page],
    queryFn: () => fetchCustomers({ page, limit }), // Pass arguments as an object
  });

  // Dehydrate the queryClient to pass to the client
  const dehydratedState = dehydrate(queryClient);
  return (
    <div>
      <HydrationBoundary state={dehydratedState}>
        <DialerPage page={page} limit={limit}/>
      </HydrationBoundary>
    </div>
  )
}

export default Dialer