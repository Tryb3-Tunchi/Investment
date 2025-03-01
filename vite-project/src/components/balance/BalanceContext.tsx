import { createContext, useState, useEffect, ReactNode } from "react";
import apiService from "../Api/apiService";

// Define the type for the balance object
interface Balance {
  id: number;
  amount: string; // String to match API response
  user?: number;
  currency?: string; // Optional, as it may not always be present
  [key: string]: any; // For additional properties
}

// Define the type for the context value
interface BalanceContextType {
  balances: Balance[];
  balance: Balance | null; // Use `balance` instead of `currentBalance`
  updateBalances: (newBalances: Balance[]) => void;
  refreshBalances: () => Promise<void>;
  createDeposit: (amount: number) => Promise<any>;
  isLoading: boolean;
  error: string | null;
}

// Create the context with a default value
export const BalanceContext = createContext<BalanceContextType>({
  balances: [],
  balance: null, // Use `balance` instead of `currentBalance`
  updateBalances: () => {},
  refreshBalances: async () => {},
  createDeposit: async () => {},
  isLoading: false,
  error: null,
});

// Define the type for the provider props
interface BalanceProviderProps {
  children: ReactNode;
}

// Create the provider component
export const BalanceProvider = ({ children }: BalanceProviderProps) => {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [balance, setBalance] = useState<Balance | null>(null); // Use `balance` instead of `currentBalance`
  const [isLoading, setIsLoading] = useState<boolean>(true); // Initialize as true to show loading on first render
  const [error, setError] = useState<string | null>(null);

  // Function to update balances manually
  const updateBalances = (newBalances: Balance[]) => {
    setBalances(newBalances);
    if (newBalances.length > 0) {
      setBalance(newBalances[0]); // Set the first balance as the current balance
    }
  };

  // Function to refresh balances from the API
  const refreshBalances = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await apiService.getBalances();
      console.log("Balances from API:", data);

      // Ensure we have an array of balances with currency
      const processedBalances = Array.isArray(data) ? data : [data];

      // Add default currency if not present
      const balancesWithCurrency = processedBalances.map((balance) => ({
        ...balance,
        currency: balance.currency || "USD",
      }));

      setBalances(balancesWithCurrency);

      // Set the first balance as the current balance
      if (balancesWithCurrency.length > 0) {
        setBalance(balancesWithCurrency[0]);
      }
    } catch (err) {
      console.error("Failed to fetch balances:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Could not load account balances. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Function to create a deposit and update balances
  const createDeposit = async (amount: number) => {
    setIsLoading(true);
    setError(null);

    try {
      // Create the deposit
      const depositResponse = await apiService.createDeposit(amount);

      // Refresh balances to get the updated balance
      await refreshBalances();

      // Return the deposit response for further use
      return depositResponse;
    } catch (err) {
      console.error("Failed to create deposit:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Could not create deposit. Please try again later."
      );
      throw err; // Re-throw the error for handling in the component
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch balances on initial load
  useEffect(() => {
    refreshBalances();
  }, []);

  // Value to be provided by the context
  const value: BalanceContextType = {
    balances,
    balance, // Use `balance` instead of `currentBalance`
    updateBalances,
    refreshBalances,
    createDeposit,
    isLoading,
    error,
  };

  return (
    <BalanceContext.Provider value={value}>{children}</BalanceContext.Provider>
  );
};

export default BalanceProvider;