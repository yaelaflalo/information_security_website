import classes from "./DropList.module.css";
import { NavLink } from "react-router-dom";

const DropList = ({closeDropDown}) => {
  return (
    <div className={classes.dropdown}>
      <ul>
        <li>
          <NavLink to="/requests/בקשת השחרה" onClick={closeDropDown}>בקשת השחרה</NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to="/requests/בקשת אישור כניסה רגלי או רכוב לבהד" onClick={closeDropDown}>בקשת אישור כניסה רגלי\רכוב</NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to="/requests/בקשת קידוד חוגר" onClick={closeDropDown}>בקשת קידוד חוגר</NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to="/requests/בקשת טופס חתימה על שוס" onClick={closeDropDown}>בקשת טופס חתימה על שו"ס</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default DropList;
