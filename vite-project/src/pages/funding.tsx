import React, { useState, useContext } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import { Wallet } from "lucide-react";
import DashboardNav from "../components/DashboardNav";
import { BalanceContext } from "../components/balance/BalanceContext"; // Import balance context

interface DepositMethod {
  name: string;
  verified: boolean;
}

interface ProcessingDeposit {
  id: string; // Unique ID for the deposit
  amount: number; // Deposit amount
  method: string; // Deposit method
  status: "processing" | "confirmed"; // Deposit status
}

const FundingPage: React.FC = () => {
  const [showDepositForm, setShowDepositForm] = useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [depositAmount, setDepositAmount] = useState<number>(200); // Minimum deposit amount
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  }>({
    text: "",
    type: "success",
  });
  const [processingDeposits, setProcessingDeposits] = useState<
    ProcessingDeposit[]
  >([]); // Track processing deposits

  // Use context for global balance state
  const {
    balance,
    createDeposit,
    // isLoading: balanceLoading,
  } = useContext(BalanceContext);

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
    setShowDepositForm(true);
    // Reset message when changing methods
    setMessage({ text: "", type: "success" });
  };

  const handleDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "success" });

    try {
      // Validate amount
      if (depositAmount < 200) {
        throw new Error("Minimum deposit amount is 200 USD");
      }

      // Simulate API call to create a deposit (replace with actual API call)
      const depositResponse = await createDeposit(depositAmount);

      // Add the deposit to the processing deposits list
      const newDeposit: ProcessingDeposit = {
        id: depositResponse?.id || Math.random().toString(36).substring(7), // Generate a unique ID
        amount: depositAmount,
        method: selectedMethod,
        status: "processing", // Set status as processing
      };
      setProcessingDeposits((prev) => [...prev, newDeposit]);

      setMessage({
        text: `Your deposit of $${depositAmount} via ${selectedMethod} is being processed. Reference ID: ${newDeposit.id}`,
        type: "success",
      });

      // Reset the form
      setDepositAmount(200);
      setShowDepositForm(false);
    } catch (error) {
      console.error("Deposit failed:", error);
      setMessage({
        text:
          error instanceof Error
            ? error.message
            : "Failed to process your deposit. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fundingOptions: string[] = [
    "Deposits",
    "Withdrawals",
    "Internal Transfer",
    "Transactions History",
  ];

  const depositMethods: DepositMethod[] = [
    { name: "Cryptocurrency", verified: false },
    { name: "Stocks", verified: false },
    { name: "Bank Wire Transfer", verified: false },
    { name: "Credit/Debit Cards", verified: true },
    { name: "Online Bank Transfer", verified: true },
    // { name: "Astropay Wallet", verified: true },
    // { name: "OnlineNaira", verified: true },
  ];

  return (
    <>
      <DashboardNav />
      <div className="w-full max-w-6xl mt-20 mx-auto p-4 space-y-6">
        {/* Account Balance Section */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Account Balance</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {balance ? (
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-500">Available Balance</p>
                <p className="text-2xl font-bold">
                  ${parseFloat(balance.amount).toFixed(2)} USD
                </p>
              </div>
            ) : (
              <p>No balance available or loading...</p>
            )}
          </CardContent>
        </Card>

        {/* Processing Deposits Section */}
        {processingDeposits.length > 0 && (
          <Card className="bg-white rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>Processing Deposits</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-4">
                {processingDeposits.map((deposit) => (
                  <li key={deposit.id} className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-500">
                      Deposit ID: {deposit.id}
                    </p>
                    <p className="text-lg font-bold">
                      ${deposit.amount.toFixed(2)} ({deposit.method})
                    </p>
                    <p
                      className={`text-sm ${
                        deposit.status === "processing"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      Status: {deposit.status}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Connect Wallet Section */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-6">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
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

              {message.text && (
                <div
                  className={`p-4 mb-4 rounded-lg ${
                    message.type === "success"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {message.text}
                </div>
              )}

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
                  <p>Minimum deposit 200 USD</p>
                  <p>
                    Remaining Deposit Limit for Non-Verified Account 2500 USD
                  </p>
                </div>
                <form onSubmit={handleDepositSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deposit Amount (USD):
                    </label>
                    <input
                      type="number"
                      min="200"
                      value={depositAmount}
                      onChange={(e) =>
                        setDepositAmount(parseFloat(e.target.value))
                      }
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Deposit"}
                  </button>
                </form>
              </div>

              <button
                className="mt-4 text-blue-500 hover:text-blue-700"
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
