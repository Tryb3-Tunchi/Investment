import React, { useState } from "react";
import {
  Menu,
  X,
  Wallet,
  User,
  ChevronDown,
  LogOut,
  DollarSign,
  CreditCard,
  //   SwapHorizontal,
} from "lucide-react";
import { MdSwapHorizontalCircle } from "react-icons/md";

const DashboardNav = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAccountReal, setAccountReal] = useState(true);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const menuItems = [
    { title: "Home", icon: "home" },
    { title: "My Accounts", icon: "user" },
    { title: "Funding", icon: "dollar" },
    { title: "Copy Trading", icon: "copy" },
    { title: "Competitions", icon: "trophy" },
    { title: "Refer A Friend", icon: "users" },
    { title: "Market Intelligence", icon: "chart" },
    { title: "XM Live", icon: "video" },
    { title: "More", icon: "more" },
  ];

  return (
    <div className="relative">
      {/* Main Navbar */}
      <nav className="bg-white shadow-md px-6 h-20 flex items-center justify-between fixed top-0 w-full z-50">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="h-6 w-6" />
          </button>

          <img src="/logo.png" alt="Logo" className="h-10" />

          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
            <span className="text-sm text-gray-500">Balance:</span>
            <span className="font-semibold text-base">
              {isAccountReal ? "$2,500.00" : "$10,000.00"}
            </span>
            <button
              onClick={() => setAccountReal(!isAccountReal)}
              className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
            >
              <span className="font-semibold">
                {isAccountReal ? "Real" : "Demo"}
              </span>
              <MdSwapHorizontalCircle className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right Section - Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center font-semibold">
            <DollarSign className="h-4 w-4 mr-2" />
            Add Balance
          </button>

          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center font-semibold">
            <Wallet className="h-4 w-4 mr-2" />
            Connect Wallet
          </button>

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
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 font-semibold"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 font-semibold"
                >
                  Settings
                </a>
                <hr className="my-2" />
                <a
                  href="#"
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
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 font-semibold"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 font-semibold"
              >
                Settings
              </a>
              <hr className="my-2" />
              <a
                href="#"
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
              <a
                key={index}
                href="#"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition-colors font-semibold"
              >
                <span>{item.title}</span>
              </a>
            ))}

            {/* Mobile-only buttons */}
            <div className="md:hidden px-6 pt-4 space-y-3">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center font-semibold">
                <DollarSign className="h-4 w-4 mr-2" />
                Add Balance
              </button>

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