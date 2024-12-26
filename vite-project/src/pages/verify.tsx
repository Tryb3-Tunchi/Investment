import React, { useState } from "react";
import {
  ArrowRight,
  Upload,
  Check,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const VerifyDetails = () => {
  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Function to handle the next step
  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  // Function to handle file changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  // Function to render error messages
  const renderError = (field) => {
    return errors[field] ? (
      <span className="text-red-500 text-sm">{errors[field]}</span>
    ) : null;
  };
  const [step, setStep] = useState(1);
  const totalSteps = 6; // Updated total steps to include the new step
  const [errors, setErrors] = useState({});

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    country: "",
    postalCode: "",
    tradingCurrency: "",
    preferredAmount: "",
    hasExperience: null,
    passport: null,
    idCard: null,
    uniqueNumber: "",
    employmentStatus: "",
    occupation: "",
    annualIncome: "",
    sourceOfFunds: "",
    bankName: "", // Make bank information optional
    accountNumber: "", // Make account number optional
    routingNumber: "", // Make routing number optional
    accountType: "",
    cryptoCurrency: "", // New field for cryptocurrency
    cryptoAmount: "", // New field for cryptocurrency amount
  });

  // Validation function remains the same as before, adding new fields
  const validateStep = (currentStep) => {
    const newErrors = {};

    switch (currentStep) {
      // Previous validation cases remain the same (1-5)
      case 1:
        if (!formData.fullName.trim())
          newErrors.fullName = "Full name is required";
        if (!formData.dateOfBirth)
          newErrors.dateOfBirth = "Date of birth is required";
        if (!formData.phoneNumber.trim())
          newErrors.phoneNumber = "Phone number is required";
        break;
      case 2:
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.country.trim()) newErrors.country = "Country is required";
        if (!formData.postalCode.trim())
          newErrors.postalCode = "Postal code is required";
        break;
      case 3:
        if (!formData.tradingCurrency)
          newErrors.tradingCurrency = "Currency is required";
        if (!formData.preferredAmount)
          newErrors.preferredAmount = "Amount is required";
        if (!formData.employmentStatus)
          newErrors.employmentStatus = "Employment status is required";
        if (!formData.occupation)
          newErrors.occupation = "Occupation is required";
        if (!formData.annualIncome)
          newErrors.annualIncome = "Annual income is required";
        if (!formData.sourceOfFunds)
          newErrors.sourceOfFunds = "Source of funds is required";
        break;
      case 4:
        if (formData.hasExperience === null)
          newErrors.hasExperience = "Please select an option";
        if (!formData.bankName) newErrors.bankName = "Bank name is required";
        if (!formData.accountNumber)
          newErrors.accountNumber = "Account number is required";
        if (!formData.routingNumber)
          newErrors.routingNumber = "Routing number is required";
        if (!formData.accountType)
          newErrors.accountType = "Account type is required";
        break;
      case 5:
        if (!formData.passport)
          newErrors.passport = "Passport photo is required";
        if (!formData.idCard) newErrors.idCard = "ID card is required";
        if (!formData.uniqueNumber.trim())
          newErrors.uniqueNumber = "Unique number is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Previous handlers remain the same

  const handleSubmit = async () => {
    if (validateStep(step)) {
      // Here you would typically send the form data to your backend
      console.log("Form submitted:", formData);
      // Add your submission logic here
    }
  };

  // Modified Step 3 to include employment details
  const renderStep3 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Financial Information</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Employment Status
            </label>
            <select
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg ${
                errors.employmentStatus ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Status</option>
              <option value="employed">Employed</option>
              <option value="self-employed">Self-Employed</option>
              <option value="retired">Retired</option>
              <option value="student">Student</option>
            </select>
            {renderError("employmentStatus")}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Occupation</label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg ${
                errors.occupation ? "border-red-500" : ""
              }`}
            />
            {renderError("occupation")}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Annual Income
            </label>
            <input
              type="number"
              name="annualIncome"
              value={formData.annualIncome}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg ${
                errors.annualIncome ? "border-red-500" : ""
              }`}
              placeholder="Enter annual income"
            />
            {renderError("annualIncome")}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Source of Funds
            </label>
            <select
              name="sourceOfFunds"
              value={formData.sourceOfFunds}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg ${
                errors.sourceOfFunds ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Source</option>
              <option value="salary">Salary</option>
              <option value="investments">Investments</option>
              <option value="savings">Savings</option>
              <option value="inheritance">Inheritance</option>
            </select>
            {renderError("sourceOfFunds")}
          </div>
        </div>

        {/* Existing trading preferences fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Trading Currency
            </label>
            <select
              name="tradingCurrency"
              value={formData.tradingCurrency}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg ${
                errors.tradingCurrency ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Currency</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
            </select>
            {renderError("tradingCurrency")}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Trading Amount
            </label>
            <input
              type="number"
              name="preferredAmount"
              value={formData.preferredAmount}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg ${
                errors.preferredAmount ? "border-red-500" : ""
              }`}
              placeholder="Enter amount"
              min="0"
            />
            {renderError("preferredAmount")}
          </div>
        </div>
      </div>
    </div>
  );

  // Add bank details to Step 4
  const renderStep4 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Banking Information</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Bank Name</label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg ${
                errors.bankName ? "border-red-500" : ""
              }`}
            />
            {renderError("bankName")}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Account Type
            </label>
            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg ${
                errors.accountType ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Type</option>
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
            </select>
            {renderError("accountType")}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Account Number
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg ${
                errors.accountNumber ? "border-red-500" : ""
              }`}
            />
            {renderError("accountNumber")}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Routing Number
            </label>
            <input
              type="text"
              name="routingNumber"
              value={formData.routingNumber}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg ${
                errors.routingNumber ? "border-red-500" : ""
              }`}
            />
            {renderError("routingNumber")}
          </div>
        </div>

        {/* Experience question */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Trading Experience</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700">
              Have you had any forex education or traded at least 15 times in
              derivative products such as forex or Contracts for Difference
              (CFDs)?
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setFormData((prev) => ({ ...prev, hasExperience: true }));
                setErrors((prev) => ({ ...prev, hasExperience: "" }));
              }}
              className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                formData.hasExperience === true
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => {
                setFormData((prev) => ({ ...prev, hasExperience: false }));
                setErrors((prev) => ({ ...prev, hasExperience: "" }));
              }}
              className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                formData.hasExperience === false
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              No
            </button>
          </div>
          {renderError("hasExperience")}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="flex items-center space-x-2 mb-6">
        <Link to="/home">
          <span className="pl-4 text-gray-600">Home</span>
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900">Verification</span>
      </div>
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold">Verification Progress</span>
            <span className="text-sm font-semibold">
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-lg ${
                      errors.fullName ? "border-red-500" : ""
                    }`}
                  />
                  {renderError("fullName")}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-lg ${
                      errors.dateOfBirth ? "border-red-500" : ""
                    }`}
                  />
                  {renderError("dateOfBirth")}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-lg ${
                      errors.phoneNumber ? "border-red-500" : ""
                    }`}
                  />
                  {renderError("phoneNumber")}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Address Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-lg ${
                      errors.address ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your full address"
                  />
                  {renderError("address")}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-lg ${
                      errors.country ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                  </select>
                  {renderError("country")}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-lg ${
                      errors.postalCode ? "border-red-500" : ""
                    }`}
                    placeholder="Enter postal code"
                  />
                  {renderError("postalCode")}
                </div>
              </div>
            </div>
          )}

          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Identity Verification</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Passport Photo
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 ${
                      errors.passport ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <input
                      type="file"
                      name="passport"
                      onChange={handleFileChange}
                      className="hidden"
                      id="passport"
                      accept="image/*"
                    />
                    <label
                      htmlFor="passport"
                      className="flex flex-col items-center cursor-pointer"
                    >
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">
                        {formData.passport
                          ? formData.passport.name
                          : "Click to upload passport photo"}
                      </span>
                    </label>
                  </div>
                  {renderError("passport")}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    ID Card
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 ${
                      errors.idCard ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <input
                      type="file"
                      name="idCard"
                      onChange={handleFileChange}
                      className="hidden"
                      id="idCard"
                      accept="image/*"
                    />
                    <label
                      htmlFor="idCard"
                      className="flex flex-col items-center cursor-pointer"
                    >
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">
                        {formData.idCard
                          ? formData.idCard.name
                          : "Click to upload ID card"}
                      </span>
                    </label>
                  </div>
                  {renderError("idCard")}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    SSN/Unique Number
                  </label>
                  <input
                    type="text"
                    name="uniqueNumber"
                    value={formData.uniqueNumber}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-lg ${
                      errors.uniqueNumber ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your SSN or unique identification number"
                  />
                  {renderError("uniqueNumber")}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                onClick={() => setStep((prev) => prev - 1)}
                className="flex items-center px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
            )}
            {step < totalSteps ? (
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-auto"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ml-auto"
              >
                Submit
                <Check className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>

        {/* Steps indicator */}
        <div className="mt-6 flex justify-center">
          <div className="flex space-x-2">
            {[...Array(totalSteps)].map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index < step ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyDetails;
