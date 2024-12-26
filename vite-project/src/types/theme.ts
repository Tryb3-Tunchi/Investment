// // types/theme.ts
// export type Theme = 'light' | 'dark';

// export interface ThemeContextType {
//   theme: Theme;
//   toggleTheme: () => void;
// }

// // context/ThemeContext.tsx
// import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { Theme, ThemeContextType } from '../types/theme';

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export function ThemeProvider({ children }: { children: ReactNode }) {
//   const [theme, setTheme] = useState<Theme>('light');

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') as Theme || 'light';
//     setTheme(savedTheme);
//     document.documentElement.classList.toggle('dark', savedTheme === 'dark');
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//     document.documentElement.classList.toggle('dark');
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };