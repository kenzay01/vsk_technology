"use client";

import { useState, useEffect } from "react";

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_LOGIN;
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const handleLogin = () => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem("adminLoggedIn", "true");
        onLogin();
      } else {
        setError("Invalid username or password");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-7 md:space-y-8 bg-white p-6 sm:p-7 md:p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-extrabold text-gray-900">
            Admin Panel
          </h2>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-sm text-gray-600">
            Enter your username and password to log in
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded">
            {error}
          </div>
        )}

        <div className="mt-6 sm:mt-7 md:mt-8 space-y-4 sm:space-y-5 md:space-y-6">
          <div className="rounded-md shadow-sm space-y-3 sm:space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded relative block w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-xs sm:text-sm md:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded relative block w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-xs sm:text-sm md:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              disabled={loading}
              onClick={handleLogin}
              className="group relative w-full flex justify-center py-1.5 sm:py-2 px-3 sm:px-4 border border-transparent text-xs sm:text-sm md:text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [filteredZipCodes, setFilteredZipCodes] = useState<string[]>([]);
  const [newZipCode, setNewZipCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchZipCodes();
  }, []);

  useEffect(() => {
    // Filtering zip codes based on search query
    if (searchQuery.trim() === "") {
      setFilteredZipCodes(zipCodes);
    } else {
      setFilteredZipCodes(
        zipCodes.filter((zipCode) =>
          zipCode.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, zipCodes]);

  const fetchZipCodes = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/zipcodes");
      if (response.ok) {
        const data = await response.json();
        setZipCodes(data.zipCodes);
        setFilteredZipCodes(data.zipCodes); // Initialize filtered list
      } else {
        setError("Error loading zip codes");
      }
    } catch (err) {
      setError(`Server error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const addZipCode = async () => {
    if (!/^\d{5}$/.test(newZipCode)) {
      setError("Zip code must be a five-digit number");
      return;
    }

    if (zipCodes.includes(newZipCode)) {
      setError("This zip code already exists");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/zipcodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zipCode: newZipCode }),
      });

      if (response.ok) {
        const updatedZipCodes = [...zipCodes, newZipCode];
        setZipCodes(updatedZipCodes);
        setFilteredZipCodes(updatedZipCodes); // Update filtered list
        setNewZipCode("");
        setError("");
      } else {
        setError("Error adding zip code");
      }
    } catch (err) {
      setError(`Server error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const removeZipCode = async (zipCode: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/zipcodes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zipCode }),
      });

      if (response.ok) {
        const updatedZipCodes = zipCodes.filter((code) => code !== zipCode);
        setZipCodes(updatedZipCodes);
        setFilteredZipCodes(updatedZipCodes); // Update filtered list
        setError("");
      } else {
        setError("Error removing zip code");
      }
    } catch (err) {
      setError(`Server error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16 py-3 sm:py-0">
            <div className="flex items-center">
              <h1 className="text-lg sm:text-xl md:text-xl font-semibold">
                Admin Panel
              </h1>
            </div>
            <div className="flex items-center mt-2 sm:mt-0">
              <button
                onClick={onLogout}
                className="ml-0 sm:ml-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm md:text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-6 sm:py-8 md:py-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-xl sm:text-2xl md:text-2xl font-bold mb-4 sm:mb-6">
          Manage Zip Codes
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded mb-3 sm:mb-4">
            {error}
          </div>
        )}

        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              value={newZipCode}
              onChange={(e) => setNewZipCode(e.target.value)}
              placeholder="Enter new zip code (5 digits)"
              maxLength={5}
              className="rounded block w-full sm:w-64 px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs sm:text-sm md:text-sm"
            />
            <button
              onClick={addZipCode}
              disabled={loading}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm md:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Zip Code"}
            </button>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search zip code..."
            className="rounded block w-full sm:max-w-md px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs sm:text-sm md:text-sm"
          />
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md p-3 sm:p-4">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {filteredZipCodes.map((zipCode) => (
              <div
                key={zipCode}
                className="flex items-center bg-gray-100 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm md:text-sm font-medium text-gray-900"
              >
                <span>{zipCode}</span>
                <button
                  onClick={() => removeZipCode(zipCode)}
                  disabled={loading}
                  className="ml-1 sm:ml-2 text-red-600 hover:text-red-800 disabled:opacity-50 focus:outline-none cursor-pointer"
                >
                  <svg
                    className="w-3 sm:w-4 h-3 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setIsLoggedIn(false);
  };

  return isLoggedIn ? (
    <AdminDashboard onLogout={handleLogout} />
  ) : (
    <AdminLogin onLogin={handleLogin} />
  );
}
