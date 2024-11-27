"use client"
import React, { useState } from 'react';
import ImportModal from './ImportCustomerModal';

// Mock customer data
const customersData = [
  {
    _id: "648a1234567f890123456789",
    name: "John Doe",
    phone: "123-456-7890",
    email: "johndoe@example.com",
    location: "New York",
    priority: "Low",
    status: "failed",
    notes: "Preferred call time: morning",
    createdAt: "2024-11-01T08:00:00Z",
    updatedAt: "2024-11-15T17:00:00Z",
  },
  {
    _id: "648b1234567f890123456789",
    name: "Jane Smith",
    phone: "987-654-3210",
    email: "janesmith@example.com",
    location: "Los Angeles",
    priority: "High",
    status: "pending",
    notes: "Requested product information.",
    createdAt: "2024-10-15T09:00:00Z",
    updatedAt: "2024-11-10T15:00:00Z",
  },
  {
    _id: "648c1234567f890123456789",
    name: "Alice Johnson",
    phone: "555-666-7777",
    email: "alicej@example.com",
    location: "Chicago",
    priority: "Mid",
    status: "pending",
    notes: "Follow-up needed.",
    createdAt: "2024-08-01T10:00:00Z",
    updatedAt: "2024-10-01T16:00:00Z",
  },
  {
    _id: "648d1234567f890123456789",
    name: "Bob Brown",
    phone: "222-333-4444",
    email: "",
    location: "Miami",
    priority: "Low",
    status: "completed",
    notes: "Satisfied with service.",
    createdAt: "2024-11-10T11:00:00Z",
    updatedAt: "2024-11-20T13:00:00Z",
  },
];

// Get CSS classes based on priority level
const getPriorityClasses = (priority) => {
  switch (priority) {
    case "Low":
      return 'bg-red-100 text-red-800';
    case "Mid":
      return 'bg-yellow-100 text-yellow-800';
    case "High":
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const CustomerTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>
    <div className="p-4 w-full">
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search Customer..."
          // value={searchQuery}
          // onChange={(e) => setSearchQuery(e.target.value)}
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
        <table className="w-full bg-white dark:bg-boxdark shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 border-b dark:border-strokedark dark:bg-boxdark">
            <tr>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-500 dark:text-white uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-500 dark:text-white uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-500 dark:text-white uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-500 dark:text-white uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-500 dark:text-white uppercase tracking-wider">Call Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customersData.map((customer, index) => (
              <tr key={index} className="dark:hover:bg-slate-600 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white text-gray-900">
                  {customer.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                  {customer.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                  {customer.email || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityClasses(customer.priority)}`}>
                    {customer.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                  {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <ImportModal
    isOpen={isModalOpen}
    onClose={handleCloseModal}
  />
  </>
  );
};

export default CustomerTable;
