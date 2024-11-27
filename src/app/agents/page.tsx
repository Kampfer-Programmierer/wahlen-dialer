// app/agents/page.tsx
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { HydrationBoundary } from '@tanstack/react-query'

// import AgentsPageContent from '../';
import { fetchAgents } from '../hooks/useAgents';
import AgentListing from '../_components/agent/AgentListing';

export default async function AgentsPage() {
  const queryClient = new QueryClient();
  const page = 1; // Default page
  const limit = 10; // Default limit

  // Prefetch agents' data on the server
  await queryClient.prefetchQuery({
    queryKey: ['agents', page],
    queryFn: () => fetchAgents({ page, limit }), // Pass arguments as an object
  });

  // Dehydrate the queryClient to pass to the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <HydrationBoundary state={dehydratedState}>
        <AgentListing page={page} limit={limit} />
      </HydrationBoundary>
    </div>
  );
}
