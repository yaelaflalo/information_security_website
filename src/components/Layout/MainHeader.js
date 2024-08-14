import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";
import DropList from "./DropList";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";
import { logout, logoutAll } from "../../Services/auth";
import UserContext from "../../context/user-context";

const MainHeader = () => {
  const [openRequestsOptions, setOpenRequestsOptions] = useState(false);
  const { role, logoutHandlerContext } = useContext(UserContext);

  const openDropdownHandler = () => {
    setOpenRequestsOptions(!openRequestsOptions);
  };

  const closeDropdownHandler = () => {
    setOpenRequestsOptions(false);
  };

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout();
      logoutHandlerContext();
    } catch {
      console.error("Enable to logout");
    }
  };

  const logoutallHandler = async () => {
    try {
      await logoutAll();
      logoutHandlerContext();
    } catch {
      console.error("Enable to logout all");
    }
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/welcome"
              onClick={logoutallHandler}
            >
              התנתקות מכל המכשירים
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/welcome"
              onClick={logoutHandler}
            >
              התנתקות
            </NavLink>
          </li>
          <li>
            <NavLink to={navigate.path} onClick={openDropdownHandler}>
              בקשות ב"מ
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/me"
              onClick={closeDropdownHandler}
            >
              אזור אישי
            </NavLink>
          </li>
          {role === "admin" && (
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? classes.active : "")}
                to="/admin"
                onClick={closeDropdownHandler}
              >
                ניהול בקשות
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : "")}
              to="/changeName"
              onClick={closeDropdownHandler}
            >
              שנה שם
            </NavLink>
          </li>
        </ul>
      </nav>
      {openRequestsOptions && <DropList closeDropDown={closeDropdownHandler} />}
      <img src={logo} alt="website logo" className={classes.logo} />
    </header>
  );
};

export default MainHeader;
