"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { setCookie } from "~/app/utils/helpers";

export default function LoginPage() {

  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = "hidden";

    // Re-enable scrolling on cleanup
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("RESPONSE", response)
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Login failed!");
        return;
      }

      const data = await response.json();

      // Handle success (e.g., redirect, save token)
      console.log("DATA", data)
      setErrorMessage("");

      setCookie("token", data.token);
      window.location.href = "/dashboard"; // Redirect to dashboard
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-gray-900 p-4">
      {/* Modern dark background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
          <div className="absolute inset-0 animate-[move_20s_linear_infinite] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NiIgaGVpZ2h0PSIxMDAiPgo8cmVjdCB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiBmaWxsPSIjMjEyMTIxIj48L3JlY3Q+CjxwYXRoIGQ9Ik0yOCA2NkwwIDUwTDAgMTZMMjggMEw1NiAxNkw1NiA1MEwyOCA2NkwyOCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzM5MzkzOSIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+CjxwYXRoIGQ9Ik0yOCAwTDI4IDM0TDAgNTBMMCA4NEwyOCAxMDBMNTYgODRMNTYgNTBMMjggMzQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzM5MzkzOSIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+Cjwvc3ZnPg==')] opacity-10"></div>
        </div>
      </div>

      {/* Login form */}
      <div className="mb-17 z-10 h-[75vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-gray-800/50 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-gray-800/60 hover:shadow-2xl">
        <div className="border-b border-gray-700 bg-gray-800/50 px-6 py-4">
          <h3 className="text-center text-5xl font-bold text-white">Log In</h3>
        </div>
        <form className="p-25" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white placeholder-gray-400 transition-all duration-300 ease-in-out hover:bg-gray-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white placeholder-gray-400 transition-all duration-300 ease-in-out hover:bg-gray-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              {/* <label
                htmlFor="remember-me"
                className="group flex cursor-pointer items-center"
              >
                <input
                  type="checkbox"
                  id="remember-me"
                  className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-600 transition-colors duration-200 ease-in-out focus:ring-purple-500 group-hover:border-purple-400"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-300 transition-colors duration-200 ease-in-out group-hover:text-purple-300">
                  Remember me
                </span>
              </label> */}

              <Link
                href="#"
                className="text-sm font-medium text-purple-400 transition-colors duration-200 ease-in-out hover:text-purple-300"
              >
                Forgot password?
              </Link>
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-[20vw] transform rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 active:scale-95"
              >
                Log In
              </button>
            </div>
          </div>
        </form>
      </div>

      <style jsx global>{`
        @keyframes move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </div>
  );
}
