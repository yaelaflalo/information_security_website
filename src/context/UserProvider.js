import React, { useState } from "react";
import UserContext from "./user-context";

const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("guest");

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
        loginHandler,
        logoutHandlerContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
