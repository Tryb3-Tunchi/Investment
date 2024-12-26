// components/Card.jsx
export const Card = ({ children, className = "" }) => (
  <div className={`bg-white font-medium bg-blue-500 hover:bg-blue-100  transition-colors duration-200 rounded-lg shadow-lg ${className}`}>{children}</div>
);

export const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 pb-2 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = "" }) => (
  <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={`p-6  ${className}`}>{children}</div>
);

export const Button = ({ children, className = "" }) => (
  <button
    className={`px-4 py-2 rounded-lg font-medium bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200 ${className}`}
  >
    {children}
  </button>
);
