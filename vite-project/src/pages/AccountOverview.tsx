import React, { useState, useEffect } from "react";
import { MoreVertical, Download, Upload, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface AccountData {
  type: string;
  accountNumber: string;
  balance: number;
  profit: number;
  currency: string;
  accountStyle: string;
}

const AccountOverview = () => {
  const [accountType, setAccountType] = useState<"real" | "demo">("real");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accounts, setAccounts] = useState<Record<string, AccountData>>({
    real: {
      type: "Real Account",
      accountNumber: "123456789",
      balance: 110,
      profit: 100,
      currency: "USD",
      accountStyle: "Standard",
    },
    demo: {
      type: "Demo Account",
      accountNumber: "987654321",
      balance: 1000,
      profit: 25000,
      currency: "USD",
      accountStyle: "Practice",
    },
  });
  const navigate = useNavigate();

  // Fetch data from the API (placeholder for actual API call)
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("/api/accounts"); // Update the endpoint as per your backend API
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  // Reset demo account balance to maximum when switching to demo
  useEffect(() => {
    if (accountType === "demo") {
      setAccounts((prev) => ({
        ...prev,
        demo: {
          ...prev.demo,
          balance: 1000, // Reset demo balance to maximum
        },
      }));
    }
  }, [accountType]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="my-16 font-semibold text-center border-b-4 pb-10">
        <p className="text-2xl font-bold py-4">
          Verify your account now to start trading
        </p>
        <Link to="/verify">
          <button
            onClick={() => navigate("verify")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold"
          >
            Verify Now
          </button>
        </Link>
      </div>

      {/* Account Overview Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Accounts Overview</h1>
        <p className="text-gray-600">
          Stay informed and manage your account with ease via the Account
          Overview.
        </p>
      </div>

      {/* Account Type Selector */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setAccountType("real")}
          className={`px-6 py-2 rounded-lg font-bold ${
            accountType === "real"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Real
        </button>
        <button
          onClick={() => setAccountType("demo")}
          className={`px-6 py-2 rounded-lg font-bold ${
            accountType === "demo"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Demo
        </button>
      </div>

      {/* Account Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Main Account Box */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="font-bold text-xl">
                {accounts[accountType]?.type}
              </h2>
              <p className="text-gray-600">
                {accounts[accountType]?.accountStyle},{" "}
                {accounts[accountType]?.currency}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                #{accounts[accountType]?.accountNumber}
              </p>
            </div>
            <div className="relative">
              <button
                className="p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <MoreVertical className="h-5 w-5" />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-10">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                    Account Information
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                    Trading History
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                    Open Positions
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                    Change Leverage
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                    Internal Transfer
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                    Refresh Balance
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 mb-1">Balance</p>
            <h3 className="text-2xl font-bold">
              ${accounts[accountType]?.balance.toLocaleString()}
            </h3>
            <div className="mt-2">
              <p className="text-gray-600 mb-1">Profit/Loss</p>
              <h3 className="text-3xl font-bold text-green-500">
                ${accounts[accountType]?.profit.toLocaleString()}
              </h3>
            </div>
          </div>

          <div className="flex space-x-4">
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold flex items-center justify-center">
              <Download className="h-4 w-4 mr-2" />
              <Link to="/funding">Deposit</Link>
            </button>

            <button className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold flex items-center justify-center">
              <Upload className="h-4 w-4 mr-2" />
              <Link to="/withdraw">Withdraw</Link>
            </button>
          </div>
        </div>

        {/* Additional Account Box */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center">
          <Plus className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="font-bold text-xl mb-2">
            Create/Open Additional Account
          </h3>
          <p className="text-gray-600 mb-4">
            Open a new trading account with us
          </p>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;