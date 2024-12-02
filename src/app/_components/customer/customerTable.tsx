"use client"
import React, { useState } from "react";
import ImportModal from "./ImportCustomerModal";
import useCustomers from "~/app/hooks/useCustomers";
import { useRouter } from "next/navigation";

// Mock customer data
// const customersData = [
//   {
//     _id: "648a1234567f890123456789",
//     name: "John Doe",
//     phone: "123-456-7890",
//     email: "johndoe@example.com",
//     location: "New York",
//     priority: "Low",
//     status: "failed",
//     notes: "Preferred call time: morning",
//     createdAt: "2024-11-01T08:00:00Z",
//     updatedAt: "2024-11-15T17:00:00Z",
//   },
//   {
//     _id: "648b1234567f890123456789",
//     name: "Jane Smith",
//     phone: "987-654-3210",
//     email: "janesmith@example.com",
//     location: "Los Angeles",
//     priority: "High",
//     status: "pending",
//     notes: "Requested product information.",
//     createdAt: "2024-10-15T09:00:00Z",
//     updatedAt: "2024-11-10T15:00:00Z",
//   },
//   {
//     _id: "648c1234567f890123456789",
//     name: "Alice Johnson",
//     phone: "555-666-7777",
//     email: "alicej@example.com",
//     location: "Chicago",
//     priority: "Mid",
//     status: "pending",
//     notes: "Follow-up needed.",
//     createdAt: "2024-08-01T10:00:00Z",
//     updatedAt: "2024-10-01T16:00:00Z",
//   },
//   {
//     _id: "648d1234567f890123456789",
//     name: "Bob Brown",
//     phone: "222-333-4444",
//     email: "",
//     location: "Miami",
//     priority: "Low",
//     status: "completed",
//     notes: "Satisfied with service.",
//     createdAt: "2024-11-10T11:00:00Z",
//     updatedAt: "2024-11-20T13:00:00Z",
//   },
// ];

// Get CSS classes based on priority level
const getPriorityClasses = (priority) => {
  switch (priority) {
    case "low":
      return "bg-red-100 text-red-800";
    case "mid":
      return "bg-yellow-100 text-yellow-800";
    case "high":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const CustomerTable = ({ page: initialPage, limit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(initialPage);

  const { query, deleteMutation } = useCustomers(page, limit);

  const { data, isLoading, isError } = query;
  const { customers, currentPage, totalPages } = data?.data || {};

  const router = useRouter();

  if (isLoading) return <div>Loading customers...</div>;
  if (isError) return <div>Error fetching customers</div>;

  const handleUpdateCustomer = (id) => {
    router.push(`/customers/update?id=${id}`);
  };

  const handleDeleteCustomer = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full p-4">
        <div className="mb-4 flex justify-between">
          <input
            type="text"
            placeholder="Search Customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-1/2 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          <button
            onClick={handleOpenModal}
            className="rounded-lg bg-primary px-6 py-3 font-medium text-gray hover:bg-opacity-90"
          >
            Import
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full overflow-hidden rounded-lg bg-white shadow-md dark:bg-boxdark">
            <thead className="border-b bg-gray-200 dark:border-strokedark dark:bg-boxdark">
              <tr>
                <th className="text-md px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500 dark:text-white">
                  Name
                </th>
                <th className="text-md px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500 dark:text-white">
                  Phone
                </th>
                <th className="text-md px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500 dark:text-white">
                  Email
                </th>
                <th className="text-md px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500 dark:text-white">
                  Priority
                </th>
                <th className="text-md px-6 py-3 text-left font-medium uppercase tracking-wider text-gray-500 dark:text-white">
                  Call Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((customer, index) => (
                <tr
                  key={index}
                  className="transition-colors duration-200 dark:hover:bg-slate-600"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {customer.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-white">
                    {customer.phone}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-white">
                    {customer.email || "N/A"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold leading-5 ${getPriorityClasses(customer.priority)}`}
                    >
                      {customer.priority}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-white">
                    {customer.status.charAt(0).toUpperCase() +
                      customer.status.slice(1)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button
                      className="text-blue-600 transition hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600"
                      onClick={() => handleUpdateCustomer(customer._id)}
                    >
                      Update
                    </button>
                    <button
                      className="ml-4 text-red-600 transition hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                      onClick={() => handleDeleteCustomer(customer._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ImportModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default CustomerTable;
