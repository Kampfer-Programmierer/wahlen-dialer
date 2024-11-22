"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Importing icons from lucide-react

const AddAgentPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    status: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (formData.password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
  
    try {
      const response = await fetch('/api/agents', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(formData), 
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`); 
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
        status: "",
      });
    } catch (error: unknown) {
      console.error('Error submitting form:', error);
      setErrorMessage((error as Error).message); 
    }
  
    setErrorMessage(""); 
  };
  

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Add Agent</h3>
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
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5 flex-1">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Email
              </label>
              <input
                name="email"
                onChange={handleInputChange}
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-x-5">
            <div className="mb-4.5 flex-1 relative">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Password
              </label>
              <input
                name="password"
                onChange={handleInputChange}
                type={showPassword ? "text" : "password"} // Toggle password type
                placeholder="Enter password"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-12 right-4 cursor-pointer text-black dark:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            <div className="mb-4.5 flex-1 relative">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Re-type Password
              </label>
              <input
                name="confirmPassword"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                type={showPassword ? "text" : "password"} 
                placeholder="Re-enter password"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="flex gap-x-5">
            <div className="mb-4.5 flex-1">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Role
              </label>
              <select
                name="role"
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="supervisor">Supervisor</option>
                <option value="agent">Agent</option>
              </select>
            </div>
            <div className="mb-4.5 flex-1">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Status
              </label>
              <select
                name="status"
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAgentPage;
