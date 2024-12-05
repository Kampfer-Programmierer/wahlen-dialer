import { QueryClient, dehydrate } from '@tanstack/react-query'
import { HydrationBoundary } from '@tanstack/react-query'
import {fetchCustomers} from '../hooks/useCustomers'
import CallLogTable from '../_components/callLogs/CallLogTable';


const CallLogPage = async() => {
//   const queryClient = new QueryClient();
//   const page = 1; // Default page
//   const limit = 10; // Default limit

const callLogsData = [
    {
      _id: "649a1234567f890123456789",
      campaignId: "649b1234567f890123456789",
      agentId: "649c1234567f890123456789",
      customerId: "649d1234567f890123456789",
      startTime: "09:00:00",
      endTime: "09:15:00",
      duration: 900, // in seconds
      callStatus: "connected",
      recordingUrl: "https://example.com/recording/649a1234567f890123456789",
      disposition: "interested",
      notes: "Customer is interested in the new product.",
      createdAt: "2024-11-25T09:00:00Z",
    },
    {
      _id: "649e1234567f890123456789",
      campaignId: "649f1234567f890123456789",
      agentId: "649g1234567f890123456789",
      customerId: "649h1234567f890123456789",
      startTime: "10:30:00",
      endTime: "10:45:00",
      duration: 900,
      callStatus: "missed",
      recordingUrl: null,
      disposition: "call later",
      notes: "Requested a callback in the evening.",
      createdAt: "2024-11-25T10:30:00Z",
    },
    {
      _id: "649i1234567f890123456789",
      campaignId: "649j1234567f890123456789",
      agentId: "649k1234567f890123456789",
      customerId: "649l1234567f890123456789",
      startTime: "11:00:00",
      endTime: "11:20:00",
      duration: 1200,
      callStatus: "dropped",
      recordingUrl: null,
      disposition: "not interested",
      notes: "Customer expressed no interest.",
      createdAt: "2024-11-25T11:00:00Z",
    },
  ];
  

//   // Prefetch agents' data on the server
//   await queryClient.prefetchQuery({
//     queryKey: ['customers', page],
//     queryFn: () => fetchCustomers({ page, limit }), // Pass arguments as an object
//   });

//   // Dehydrate the queryClient to pass to the client
//   const dehydratedState = dehydrate(queryClient);

  return(
    <div>
      {/* <HydrationBoundary state={dehydratedState}> */}
        <CallLogTable callLogs={callLogsData}/>
      {/* </HydrationBoundary> */}
    </div>
  )
};

export default CallLogPage;
