// src/components/RequireAuth.jsx
import { Navigate, useLocation } from 'react-router-dom';

export default function RequireAuth({ children }) {
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}
