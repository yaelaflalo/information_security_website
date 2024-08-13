import React, { useState, useEffect } from "react";
import UserContext from "./user-context";
import { getMe } from "../Services/auth";
import httpCommon from "../Services/httpCommon";

const fetchUserInfo = async (
  setUserName,
  setEmail,
  setRole,
  setIsAuthenticated,
  setLoading,
  logoutHandlerContext
) => {
  try {
    const userInfo = await getMe();
    setUserName(userInfo.name);
    setEmail(userInfo.email);
    setRole(userInfo.role);
    setIsAuthenticated(true);
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    logoutHandlerContext();
  } finally {
    setLoading(false);
  }
};

const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("guest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      httpCommon.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUserInfo(
        setUserName,
        setEmail,
        setRole,
        setIsAuthenticated,
        setLoading,
        logoutHandlerContext
      );
    } else {
      setLoading(false);
    }
  }, []);

  const loginHandler = (name, userEmail, userRole) => {
    setUserName(name);
    setEmail(userEmail);
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const logoutHandlerContext = () => {
    setUserName("");
    setEmail("");
    setIsAuthenticated(false);
    setRole("guest");
  };

  return (
    <UserContext.Provider
      value={{
        userName,
        email,
        isAuthenticated,
        role,
        loading,
        loginHandler,
        logoutHandlerContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
