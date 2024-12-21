import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AlertCircle } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password)
    );
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError(""); // Clear errors on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 8 characters and contain uppercase, lowercase, and numbers"
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.agreedToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // TODO: Replace with actual signup API call
      console.log("Signing up:", {
        name: formData.name,
        username: formData.username,
        email: formData.email,
      });

      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      setError("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGmailSignUp = async () => {
    setError("");
    setLoading(true);
    try {
      // TODO: Implement actual Google Sign-Up logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Signing up with Gmail");
      navigate("/login");
    } catch (error) {
      console.error("Google signup error:", error);
      setError("Failed to sign up with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full items-center justify-center bg-gray-50 px-4 py-8 mt-20">
      <div className="max-w-md w-full space-y-8 pt-14">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <button
              onClick={() => navigate("/signin")}
              className="font-medium text-indigo-600 hover:text-indigo-500"
              disabled={loading}
            >
              <Link></Link>
              sign in to an existing account
            </button>
          </p>
        </div>

        {error && (
          <div className="p-4 text-red-600 bg-red-50 rounded-md border border-red-100">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                disabled={loading}
                value={formData.name}
                onChange={handleInputChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                disabled={loading}
                value={formData.username}
                onChange={handleInputChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={loading}
                value={formData.email}
                onChange={handleInputChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Email address"
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
                required
                disabled={loading}
                value={formData.password}
                onChange={handleInputChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                disabled={loading}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="agreedToTerms"
                type="checkbox"
                required
                disabled={loading}
                checked={formData.agreedToTerms}
                onChange={handleInputChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded disabled:cursor-not-allowed"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-700">
                I agree to the Terms & Conditions
              </label>
              <p className="text-xs text-gray-500 mt-1">
                By registering, you agree to our Terms & Conditions, Privacy and
                Cookie Policy, and to join our loyalty programme. Sign up and
                never miss out on exclusive member rewards, tailored new
                arrivals and new launches. Unsubscribe at the bottom of our
                emails.
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGmailSignUp}
              disabled={loading}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Sign up with Gmail</span>
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              <span className="ml-2">Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
