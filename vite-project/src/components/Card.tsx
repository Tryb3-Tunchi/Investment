// components/Card.jsx
export const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-lg ${className}`}>{children}</div>
);

export const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 pb-2 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = "" }) => (
  <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);
