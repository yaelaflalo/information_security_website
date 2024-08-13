import { createContext } from "react";

const UserContext = createContext({
  userName: '',
  isAuthenticated: false,
  role: 'guest', 
  loginHandler: () => {}, 
  logoutHandlerContext: () => {} 
});

export default UserContext;