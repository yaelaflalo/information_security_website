import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/user-context";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { isAuthenticated, role, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!isAuthenticated) {
    return <Navigate to="/welcome" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

export default ProtectedRoute;
