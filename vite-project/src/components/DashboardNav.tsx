import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Wallet,
  User,
  DollarSign,
} from "lucide-react";
import { MdSwapHorizontalCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./themeToggle";

const DashboardNav = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAccountReal, setAccountReal] = useState(true);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [balance, setBalance] = useState("$100.00");

  const menuItems = [
    { title: "Home", path: "/home", icon: "home" },
    { title: "My Accounts", path: "/account", icon: "user" },
    { title: "Funding", path: "/funding", icon: "dollar" },
    { title: "Copy Trading", path: "/trade", icon: "copy" },
    { title: "Refer A Friend", path: "/Refer-friend", icon: "users" },
    { title: "Market Intelligence", path: "/market", icon: "chart" },
    { title: "More", path: "", icon: "more" },
  ];

  useEffect(() => {
    // Simulated API call to fetch balance
    const fetchBalance = async () => {
      try {
        const response = await fetch("/api/getBalance", { method: "GET" });
        if (!response.ok) {
          throw new Error("Failed to fetch balance");
        }
        const data = await response.json();
        setBalance(isAccountReal ? data.realBalance : data.demoBalance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [isAccountReal]);

  return (
    <div className="relative">
      {/* Main Navbar */}
      <nav className="bg-white shadow-md px-6 h-20 flex items-center justify-between fixed top-0 w-full z-50">
        {/* Left Section */}
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="h-6 w-6 font-semibold" />
          </button>

          <img src="/logo.png" alt="Logo" className="h-10 w-10" />

          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2 ">
            <span className="text-xl text-gray-500 hidden lg:block">
              Balance:
            </span>
            <span className="font-semibold text-bas text-xl">{balance}</span>
            <button
              onClick={() => setAccountReal(!isAccountReal)}
              className="flex items-center space-x-1 text-sm text-green-300 hover:text-blue-700"
            >
              <span className="font-semibold text-xl hidden md:block  pl-4">
                {isAccountReal ? "Real" : "Demo"}
              </span>
              <MdSwapHorizontalCircle className="h-6 w-8" />
            </button>
          </div>
        </div>

        {/* Right Section - Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/funding">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center font-semibold">
              <DollarSign className="h-4 w-4 mr-2" />
              Add Balance
            </button>
          </Link>

          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center font-semibold">
            <Wallet className="h-4 w-4 mr-2" />
            Connect Wallet
          </button>

          <ThemeToggle />

          <div className="relative">
            <button
              onClick={() => setProfileOpen(!isProfileOpen)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <User className="h-6 w-6" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                <a
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 font-semibold"
                >
                  Profile
                </a>
                <a
                  href="/settings"
                  className="block px-4 py-2 hover:bg-gray-100 font-semibold"
                >
                  Settings
                </a>
                <hr className="my-2" />
                <a
                  href="signin"
                  className="block px-4 py-2 text-red-600 hover:bg-red-50 font-semibold"
                >
                  Sign Out
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="relative md:hidden">
          <button
            onClick={() => setProfileOpen(!isProfileOpen)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <User className="h-6 w-6" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
              <a
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100 font-semibold"
              >
                Profile
              </a>
              <a
                href="/settings"
                className="block px-4 py-2 hover:bg-gray-100 font-semibold"
              >
                Settings
              </a>
              <hr className="my-2" />
              <a
                href="/signin"
                className="block px-4 py-2 text-red-600 hover:bg-red-50 font-semibold"
              >
                Sign Out
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-50 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-bold text-lg">Menu</h2>
            <div className="md:hidden">
              <ThemeToggle />
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="py-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition-colors font-semibold"
              >
                <span>{item.title}</span>
              </Link>
            ))}

            {/* Mobile-only buttons */}
            <div className="md:hidden px-6 pt-4 space-y-3">
              <Link to="/funding">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center font-semibold">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Add Balance
                </button>
              </Link>

              <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center justify-center font-semibold">
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
