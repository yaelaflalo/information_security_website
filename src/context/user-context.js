import { createContext } from "react";

const UserContext = createContext({
  userName: '',
  isAuthenticated: false,
  role: 'guest', // 'guest', 'user', 'admin'
  login: () => {}, 
  logout: () => {} 
});

export default UserContext;