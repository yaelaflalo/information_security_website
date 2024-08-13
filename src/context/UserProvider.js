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

  const logoutHandler = () => {
    setUserName('');
    setIsAuthenticated(false);
    setRole('guest');
  };

  return (
    <UserContext.Provider value={{ userName, isAuthenticated, role, loginHandler, logoutHandler }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;