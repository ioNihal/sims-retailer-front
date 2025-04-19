// src/components/RequireAuth.jsx
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isLoggedIn = Boolean(token);


  return isLoggedIn ? children : <Navigate to="/login" replace />;
};
export default RequireAuth
