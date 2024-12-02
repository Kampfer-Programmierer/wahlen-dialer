"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateCustomerPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    priority: "",
    status: "",
    notes: "",
  });

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "mid", label: "Mid" },
    { value: "high", label: "High" },
  ];

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "failed", label: "Failed" },
    { value: "completed", label: "Completed" },
  ];

  useEffect(() => {
    if (id) {
      // Fetch customer details by ID and populate form
      const fetchCustomer = async () => {
        try {
          const response = await fetch(`/api/customers/${id}`);
          if (response.ok) {
            const { data } = await response.json();
            setFormData({
              name: data.name || "",
              phone: data.phone || "",
              email: data.email || "",
              location: data.location || "",
              priority: data.priority || "",
              status: data.status || "",
              notes: data.notes || "",
            });
          } else {
            console.error("Failed to fetch customer data");
          }
        } catch (error) {
          console.error("Error fetching customer:", error);
        }
      };

      fetchCustomer();
    }
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      const response = await fetch(`/api/customers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setFormData({
        name: "",
        phone: "",
        email: "",
        location: "",
        priority: "",
        status: "",
        notes: "",
      });
      router.push("/customers"); // Redirect back to the customer listing page
    } catch (error: unknown) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Update Customer
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          <div className="flex gap-x-5">
            <div className="mb-4.5 flex-1">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Name
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter customer name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5 flex-1">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Phone Number
              </label>
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-x-5">
            <div className="mb-4.5 flex-1">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5 flex-1">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Location
              </label>
              <input
                name="location"
                type="text"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter location"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-x-5">
            <div className="mb-4.5 flex-1">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select Priority</option>
                {priorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4.5 flex-1">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select Status</option>
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Notes
            </label>
            <textarea
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Enter additional notes"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
          </div>
          <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Update Customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCustomerPage;
