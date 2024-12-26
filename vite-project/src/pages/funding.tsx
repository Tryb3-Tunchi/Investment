import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Wallet } from "lucide-react";
import DashboardNav from "../components/DashboardNav";

const FundingPage = () => {
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setShowDepositForm(true);
  };

  const fundingOptions = [
    "Deposits",
    "Withdrawals",
    "Internal Transfer",
    "Transactions History",
  ];

  const depositMethods = [
    { name: "Credit/Debit Cards", verified: false },
    { name: "Cryptocurrency", verified: false },
    { name: "stocks", verified: false },
    { name: "Online Bank Transfer", verified: true },
    { name: "Astropay wallet", verified: true },
    { name: "OnlineNaira", verified: true },
  ];

  return (
    <>
      <DashboardNav />
      <div className="w-full max-w-6xl mt-20 mx-auto p-4 space-y-6">
        {/* Connect Wallet Section */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <button className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Connect Wallet
            </button>
          </CardContent>
        </Card>

        {!showDepositForm ? (
          // Initial View
          <div className="grid md:grid-cols-2 gap-6">
            {/* Funding Options */}
            <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Funding</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {fundingOptions.map((option) => (
                    <li
                      key={option}
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Deposit Methods */}
            <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Deposit Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {depositMethods.map((method) => (
                    <li
                      key={method.name}
                      className={`flex items-center p-2 rounded-lg ${
                        method.verified
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer hover:bg-gray-50"
                      }`}
                      onClick={() =>
                        !method.verified && handleMethodSelect(method.name)
                      }
                    >
                      <span className="text-gray-800">{method.name}</span>
                      {method.verified && (
                        <span className="ml-2 text-sm text-gray-500">
                          (Verified clients only)
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Deposit Form View
          <Card className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold mb-6">
                Before you proceed with a deposit via {selectedMethod}, please
                note the following:
              </h2>
              <ul className="space-y-4 mb-8 list-disc pl-6">
                <li>
                  Please make sure that all payments are made from an account
                  registered in the same name as your XM account.
                </li>
                <li>
                  All withdrawals, excluding profits, can only be paid back to
                  the credit/debit card that the deposit was initiated from, up
                  to the deposited amount.
                </li>
                <li>
                  XM does not charge any commissions or fees for deposits via
                  credit/debit cards.
                </li>
                <li>
                  By submitting a deposit request, you consent to your data
                  being shared with third parties, including payment service
                  providers, banks, card schemes, regulators, law enforcement,
                  government agencies, credit reference bureaus and other
                  parties we deem necessary to process your payment and/or
                  verify your identity.
                </li>
              </ul>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4">
                  Deposit Funds - {selectedMethod}
                </h3>
                <p className="mb-4">
                  Please enter the amount you wish to deposit to your account.
                  Click on "Deposit" and you will be redirected to the payment
                  page, where you will be asked for your payment details.
                </p>
                <div className="text-sm text-gray-600 mb-4">
                  <p>Minimum deposit 5 USD</p>
                  <p>
                    Remaining Deposit Limit for Non-Verified Account 2500 USD
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deposit Amount (USD):
                    </label>
                    <input type="number" min="5" className="w-full" />
                  </div>
                  <button className="w-full">Deposit</button>
                </div>
              </div>

              <button
                className="mt-4"
                onClick={() => setShowDepositForm(false)}
              >
                Back to Deposit Methods
              </button>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default FundingPage;
