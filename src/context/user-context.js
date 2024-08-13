import { createContext } from "react";

const UserContext = createContext({
  userName: '',
  isAuthenticated: false,
  role: 'guest', 
  email: '',
  loginHandler: () => {}, 
  logoutHandlerContext: () => {} 
});

export default UserContext;