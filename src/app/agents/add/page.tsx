"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react"; // Importing icons from lucide-react
import { useSearchParams, useRouter } from "next/navigation";

const AddAgentPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    status: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordCleared, setIsPasswordCleared] = useState(false);

  useEffect(() => {
    if (id) {
      // Fetch agent details by ID and populate form
      const fetchAgent = async () => {
        try {
          const response = await fetch(`/api/agents/${id}`);
          if (response.ok) {
            const { data } = await response.json();
            setFormData({
              name: data.name,
              email: data.email,
              password: data.password, // Keep password blank on load
              role: data.role,
              status: data.status,
            });
          } else {
            console.error("Failed to fetch agent data");
          }
        } catch (error) {
          console.error("Error fetching agent:", error);
        }
      };

      fetchAgent();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log("justin",formData.password && formData.password !== confirmPassword && isPasswordCleared);

  const handlePasswordClear = () => {
    setFormData((prev) => ({ ...prev, password: "" }));
    setConfirmPassword("");
    setIsPasswordCleared(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password && formData.password !== confirmPassword && isPasswordCleared) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const method = id ? "PUT" : "POST";
      const url = id ? `/api/agents/${id}` : "/api/agents";

      // Exclude password from the request if not updated
      const payload = { ...formData };
      if (id && !isPasswordCleared) {
        delete payload.password;
      }

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
        email: "",
        password: "",
        role: "",
        status: "",
      });
      setConfirmPassword("");
      setErrorMessage("");
      router.push("/agents"); // Redirect back to the listing page
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage((error as Error).message);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">{id ? "Update Agent" : "Add Agent"}</h3>
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
                value={formData.email}
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
                value={formData.password}
                onChange={handleInputChange}
                type={showPassword ? "text" : "password"} // Toggle password type
                placeholder="Enter password"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                disabled={id && !isPasswordCleared}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-12 right-12 cursor-pointer text-black dark:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
              {id && (
                <button
                  type="button"
                  onClick={handlePasswordClear}
                  className="absolute top-12 right-4 bg-red-500 text-white px-2 py-1 rounded"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="mb-4.5 flex-1 relative">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Re-type Password
              </label>
              <input
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter password"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                disabled={id && !isPasswordCleared}
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
                value={formData.role}
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
                value={formData.status}
                onChange={handleInputChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-x-5">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded bg-primary px-6 py-2 text-white font-medium hover:bg-opacity-90"
            >
              {id ? "Update Agent" : "Add Agent"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAgentPage;
