"use client";
import { Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAgents } from "~/app/hooks/useAgents";
import AgentCard from "./AgentCard";
import { useRouter } from "next/navigation";

interface Props {
  page: number;
  limit: number;
}

const AgentListing = ({ page: initialPage, limit }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(initialPage);

  const { query, addMutation, updateMutation, deleteMutation } = useAgents(page, limit);
  const { data, isLoading, isError } = query;
  const { agents, currentPage, totalPages } = data?.data || {};

  const router = useRouter();

  if (isLoading) return <div>Loading agents...</div>;
  if (isError) return <div>Error fetching agents</div>;


  // const handleAddAgent = () => {
  //   addMutation.mutate({ name: 'New Agent', email: 'newagent@example.com' });
  // };

  const handleUpdateClick = ( id ) => {
    router.push(`/agents/add?id=${id}`);
  };

  const handleDeleteAgent = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <>
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search Agent..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/2 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        <Link
          href={"/agents/add"}
          className="rounded-lg bg-primary px-6 py-3 font-medium text-gray hover:bg-opacity-90"
        >
          Add
        </Link>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {agents.map((agent) => (
          <AgentCard
            key={agent._id}
            agent={agent}
            onUpdate={() => handleUpdateClick(agent._id)}
            onDelete={()=> handleDeleteAgent(agent._id)}
          />
        ))}
        {agents.length === 0 && (
          <p className="text-center text-gray-500">No agents found.</p>
        )}
      </div>
    </>
  );
};

export default AgentListing;