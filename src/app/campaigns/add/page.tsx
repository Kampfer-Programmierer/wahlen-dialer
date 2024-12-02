"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

const AddCampaignPage = () => {

  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");


  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    callScript: "",
    // assignedAgents: [],
    status: "",
  });

  const agentOptions = [
    { value: "anas", label: "Anas" },
    { value: "talha", label: "Talha" },
    { value: "faraz", label: "Faraz" },
  ];

  useEffect(() => {
    if (id) {
      // Fetch agent details by ID and populate form
      const fetchCampaign = async () => {
        try {
          const response = await fetch(`/api/campaigns/${id}`);
          if (response.ok) {
            const { data } = await response.json();
            setFormData({
              name: data.name,
              description: data.description,
              startDate: data.startDate,
              endDate: data.endDate,
              status: data.status,
              callScript: data.callScript
            });
          } else {
            console.error("Failed to fetch campaign data");
          }
        } catch (error) {
          console.error("Error fetching campaign:", error);
        }
      };

      fetchCampaign();
    }
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (
    date: Date | null,
    field: "startDate" | "endDate",
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date ? date.toISOString().split("T")[0] : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const method = id ? "PUT" : "POST";
      const url = id ? `/api/campaigns/${id}` : "/api/campaigns";

      const payload = { ...formData };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      setFormData({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        callScript: "",
        // assignedAgents: [],
        status: "",
      });
      router.push("/campaigns"); // Redirect back to the listing page
    } catch (error: unknown) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Add Campaign</h3>
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
                placeholder="Enter campaign name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5 flex-1">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select Status</option>
                <option value="inactive">Inactive</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          <div className="flex gap-x-2">
            <div className="flex w-1/2 gap-x-6">
              <div className="relative mb-4.5">
                <label
                  htmlFor="startDate"
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                >
                  Start Date
                </label>
                <DatePicker
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="startDate"
                  selected={
                    formData.startDate ? new Date(formData.startDate) : null
                  }
                  onChange={(date) => handleDateChange(date, "startDate")}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select Start Date"
                />
              </div>
              <div className="relative mb-4.5">
                <label
                  htmlFor="endDate"
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                >
                  End Date
                </label>
                <DatePicker
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="endDate"
                  selected={
                    formData.endDate ? new Date(formData.endDate) : null
                  }
                  onChange={(date) => handleDateChange(date, "endDate")}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select End Date"
                  minDate={
                    formData.startDate ? new Date(formData.startDate) : null
                  }
                />
              </div>
            </div>
            {/* <div className="mb-4.5 flex-1">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Agents
              </label>
              <Select
                isMulti
                name="assignedAgents"
                options={agentOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                value={agentOptions.filter((option) =>
                  formData.assignedAgents.includes(option.value),
                )}
                onChange={(selectedOptions) => {
                  setFormData((prev) => ({
                    ...prev,
                    assignedAgents: selectedOptions.map(
                      (option) => option.value,
                    ),
                  }));
                }}
              />
            </div> */}
          </div>
          <div className="flex gap-x-5">
            <div className="mb-4.5 flex-1">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Description
              </label>
              <textarea
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>
            <div className="mb-4.5 flex-1">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Script
              </label>
              <textarea
                rows={4}
                name="callScript"
                value={formData.callScript}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>
          </div>
          <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCampaignPage;
