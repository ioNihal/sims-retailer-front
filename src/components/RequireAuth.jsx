// src/components/RequireAuth.jsx
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const token       = localStorage.getItem("token");
  const expiryMs    = parseInt(localStorage.getItem("tokenExpiry") || "0", 10);
  const isLoggedIn  = Boolean(token) && Date.now() < expiryMs;
  const location    = useLocation();

  // If expired or missing, clear out and redirect
  if (!isLoggedIn) {
    // remove anything related to auth
    ["token","tokenType","tokenExpiry","user","isLoggedIn","adminEmail"].forEach(k =>
      localStorage.removeItem(k)
    );
    // redirect to login, preserve where they were trying to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
