import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  BarChart2,
  Download,
  Upload,
  RefreshCcw,
  Link,
} from "lucide-react";
import Footer from "../components/Footer";
import MainFooter from "../components/Mainfooter";

// const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
//     <div className={`bg-white rounded-lg shadow-lg ${className}`}>
//       {children}
//     </div>
//   );

//   const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
//     <div className={`p-6 pb-2 ${className}`}>
//       {children}
//     </div>
//   );

//   const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
//     <h2 className={`text-2xl font-bold ${className}`}>
//       {children}
//     </h2>
//   );

//   const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
//     <div className={`p-6 ${className}`}>
//       {children}
//     </div>
//   );

const MyAccount = () => {
  const [showTrading, setShowTrading] = useState(false);

  // Sample account data
  const accountData = {
    balance: 10000.5,
    equity: 12500.75,
    margin: 2500.25,
    freeMargin: 8000.25,
    marginLevel: 450.5,
    openPositions: 3,
    profitLoss: 2500.25,
  };

  // Sample market data
  const marketData = [
    { time: "9:00", price: 1.325 },
    { time: "10:00", price: 1.3255 },
    { time: "11:00", price: 1.3245 },
    { time: "12:00", price: 1.326 },
    { time: "13:00", price: 1.327 },
    { time: "14:00", price: 1.3265 },
    { time: "15:00", price: 1.328 },
    { time: "16:00", price: 1.3275 },
  ];

  const AccountOverview = () => (
    <div className="space-y-6">
      <Card className="bg-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <a href="/home">
            <CardTitle className="text-2xl font-bold">
              Account Overview
            </CardTitle>
          </a>
          <button
            onClick={() => setShowTrading(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <BarChart2 className="w-4 h-4" />
            <span>Open Trading View</span>
          </button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">Balance</p>
                  <h3 className="text-2xl font-bold">
                    ${accountData.balance.toFixed(2)}
                  </h3>
                </div>
                <Wallet className="w-8 h-8 opacity-80" />
              </div>
            </div>

            {/* Equity Card */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">Equity</p>
                  <h3 className="text-2xl font-bold">
                    ${accountData.equity.toFixed(2)}
                  </h3>
                </div>
                <ArrowUpRight className="w-8 h-8 opacity-80" />
              </div>
            </div>

            {/* Profit/Loss Card */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">Profit/Loss</p>
                  <h3 className="text-2xl font-bold">
                    ${accountData.profitLoss.toFixed(2)}
                  </h3>
                </div>
                <RefreshCcw className="w-8 h-8 opacity-80" />
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Margin</p>
              <p className="text-lg font-semibold">
                ${accountData.margin.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Free Margin</p>
              <p className="text-lg font-semibold">
                ${accountData.freeMargin.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Margin Level</p>
              <p className="text-lg font-semibold">
                {accountData.marginLevel}%
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Open Positions</p>
              <p className="text-lg font-semibold">
                {accountData.openPositions}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                type: "Deposit",
                amount: 5000,
                time: "2 hours ago",
                icon: Download,
              },
              {
                type: "Withdrawal",
                amount: -2000,
                time: "1 day ago",
                icon: Upload,
              },
              {
                type: "Trade Closed",
                amount: 750.25,
                time: "2 days ago",
                icon: RefreshCcw,
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-2 rounded-full">
                    <activity.icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.type}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
                <span
                  className={`font-semibold ${
                    activity.amount >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {activity.amount >= 0 ? "+" : ""}
                  {activity.amount.toFixed(2)} USD
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const TradingView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowTrading(false)}
          className="text-gray-600 hover:text-gray-800 flex items-center space-x-2"
        >
          <ArrowDownRight className="w-4 h-4" />
          <span>Back to Account Overview</span>
        </button>
        <div className="flex items-center space-x-4">
          <Clock className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-600">Last updated: Just now</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>EUR/USD Market Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marketData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Open</p>
              <p className="text-lg font-semibold">1.3250</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">High</p>
              <p className="text-lg font-semibold">1.3280</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Low</p>
              <p className="text-lg font-semibold">1.3245</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Close</p>
              <p className="text-lg font-semibold">1.3275</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {showTrading ? <TradingView /> : <AccountOverview />}
      </div>
      <MainFooter />
    </div>
  );
};

export default MyAccount;
