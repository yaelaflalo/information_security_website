import React, { useState } from "react";
import UserContext from "./user-context";

const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('guest');

  const loginHandler = (name, userRole) => {
    setUserName(name);
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const logoutHandlerContext = () => {
    setUserName('');
    setIsAuthenticated(false);
    setRole('guest');
  };

  return (
    <UserContext.Provider value={{ userName, isAuthenticated, role, loginHandler, logoutHandlerContext }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;