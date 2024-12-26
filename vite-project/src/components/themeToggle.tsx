// hooks/useTheme.ts
import { useState, useEffect } from "react";

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem("darkMode", String(newMode));
    document.documentElement.classList.toggle("dark");
  };

  return { isDark, toggleTheme };
};

// components/ThemeToggle.tsx
import { Sun, Moon } from "lucide-react";
// import { useTheme } from "../hooks/useTheme";

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};
