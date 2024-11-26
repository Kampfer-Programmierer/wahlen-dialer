// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// const AgentsPage = () => {
//   const mockUsers = [
//     {
//       _id: "64b2f8176dcf5d25a6a78b1e",
//       name: "Alice Johnson",
//       email: "alice.johnson@example.com",
//       password: "$2b$10$abcdefg1234567",
//       role: "admin",
//       status: "active",
//       num: "1234567890",
//       assignedCampaigns: [
//         "64c3a1236cde5d10f4b57a1b",
//         "64c3a1246cde5d10f4b57a1c",
//       ],
//     },
//     {
//       _id: "64b2f8176dcf5d25a6a78b1f",
//       name: "Bob Smith",
//       email: "bob.smith@example.com",
//       password: "$2b$10$hijklmn1234567",
//       role: "agent",
//       status: "active",
//       num: "1234567890",
//       assignedCampaigns: ["64c3a1256cde5d10f4b57a1d"],
//     },
//     {
//       _id: "64b2f8176dcf5d25a6a78b20",
//       name: "Carol Lee",
//       email: "carol.lee@example.com",
//       password: "$2b$10$opqrstu1234567",
//       role: "supervisor",
//       status: "inactive",
//       num: "1234567890",
//       assignedCampaigns: [],
//     },
//     {
//       _id: "64b2f8176dcf5d25a6a78b21",
//       name: "David Brown",
//       email: "david.brown@example.com",
//       password: "$2b$10$vwxyzab1234567",
//       role: "agent",
//       status: "active",
//       num: "1234567890",
//       assignedCampaigns: [
//         "64c3a1266cde5d10f4b57a1e",
//         "64c3a1276cde5d10f4b57a1f",
//       ],
//     },
//     {
//       _id: "64b2f8176dcf5d25a6a78b22",
//       name: "Evelyn Harris",
//       email: "evelyn.harris@example.com",
//       password: "$2b$10$qrstuvw1234567",
//       role: "supervisor",
//       status: "active",
//       num: "1234567890",
//       assignedCampaigns: ["64c3a1286cde5d10f4b57a20"],
//     },
//     {
//       _id: "64b2f8176dcf5d25a6a78b23",
//       name: "Frank Miller",
//       email: "frank.miller@example.com",
//       password: "$2b$10$xyzabcd1234567",
//       role: "admin",
//       status: "active",
//       num: "1234567890",
//       assignedCampaigns: [],
//     },
//     {
//       _id: "64b2f8176dcf5d25a6a78b24",
//       name: "Grace Wilson",
//       email: "grace.wilson@example.com",
//       password: "$2b$10$mnopqrs1234567",
//       role: "agent",
//       status: "inactive",
//       num: "1234567890",
//       assignedCampaigns: ["64c3a1296cde5d10f4b57a21"],
//     },
//     {
//       _id: "64b2f8176dcf5d25a6a78b25",
//       name: "Henry Lewis",
//       email: "henry.lewis@example.com",
//       password: "$2b$10$efghijk1234567",
//       role: "supervisor",
//       status: "active",
//       num: "1234567890",
//       assignedCampaigns: ["64c3a1306cde5d10f4b57a22"],
//     },
//     {
//       _id: "64b2f8176dcf5d25a6a78b26",
//       name: "Irene Martinez",
//       email: "irene.martinez@example.com",
//       password: "$2b$10$stuvwxz1234567",
//       role: "agent",
//       status: "active",
//       num: "1234567890",
//       assignedCampaigns: [
//         "64c3a1316cde5d10f4b57a23",
//         "64c3a1326cde5d10f4b57a24",
//       ],
//     },
//     {
//       _id: "64b2f8176dcf5d25a6a78b27",
//       name: "Jack Davis",
//       email: "jack.davis@example.com",
//       password: "$2b$10$abcdxyz1234567",
//       role: "admin",
//       status: "inactive",
//       num: "1234567890",
//       assignedCampaigns: [],
//     },
//   ];

//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredAgents = mockUsers.filter((agent) =>
//     agent.name.toLowerCase().includes(searchQuery.toLowerCase()),
//   );

 
  

//   return (
//     <>
//       <div className="mb-4 flex justify-between">
//         <input
//           type="text"
//           placeholder="Search Agent..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-1/2 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//         />
//         <Link
//           href={"/agents/add"}
//           className="rounded-lg bg-primary px-6 py-3 font-medium text-gray hover:bg-opacity-90"
//         >
//           Add
//         </Link>
//       </div>
//       <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {filteredAgents.map((agent) => (
//           <div
//             className="w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-lg dark:border-strokedark dark:bg-boxdark"
//             key={agent._id}
//           >
//             <div className="space-y-4 p-6">
//               <div className="flex flex-col items-center space-y-4">
//                 <div>
//                   <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
//                     {agent.name}
//                   </h2>
//                   <p className="text-center text-sm capitalize text-gray-600 dark:text-gray-300">
//                     {agent.role}
//                   </p>
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
//                     Email
//                   </span>
//                   <a
//                     href={`mailto:${agent.email}`}
//                     className="text-sm text-blue-600 hover:underline"
//                     aria-label={`Send email to ${agent.name}`}
//                   >
//                     {agent.email}
//                   </a>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
//                     Status
//                   </span>
//                   <span
//                     className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ${
//                       agent.status.toLowerCase() === "active"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {agent.status}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
//                     Number
//                   </span>
//                   <span
//                     className={` text-gray-600 dark:text-gray-300 text-xs`}
//                   >
//                     {agent.num}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
//                     Campaigns
//                   </span>
//                   <div className="flex flex-wrap gap-1">
//                     {
//                     agent.assignedCampaigns.length > 0 ? (
//                       agent.assignedCampaigns.map((campaign, index) => (
//                         <span
//                           key={index}
//                           className="rounded-full text-xs font-semibold capitalize text-blue-800"
//                         >
//                           {campaign}
//                         </span>
//                       ))
//                     ) : (
//                       <span className="text-xs text-gray-500">
//                         No campaigns assigned
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//         {filteredAgents.length === 0 && (
//           <p className="text-center text-gray-500">No agents found.</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default AgentsPage;

// app/agents/page.tsx
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

// import AgentsPageContent from '../';
import { fetchAgents } from '../hooks/useAgents';

export default async function AgentsPage() {
  const queryClient = new QueryClient();
  const page = 1; // Default page
  const limit = 10; // Default limit

  // Prefetch agents' data on the server
  await queryClient.prefetchQuery(['agents', page], () => fetchAgents(page, limit));

  // Dehydrate the queryClient to pass to the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <HydrationBoundary state={dehydratedState}>
        {/* <AgentsPageContent page={page} limit={limit} /> */}
        <div>hello</div>
      </HydrationBoundary>
    </div>
  );
}

