import classes from "./DropList.module.css";
import { NavLink } from "react-router-dom";

const DropList = ({closeDropDown}) => {
  return (
    <div className={classes.dropdown}>
      <ul>
        <li>
          <NavLink to="/requests/type1" onClick={closeDropDown}>בקשת השחרה</NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to="/requests/type2" onClick={closeDropDown}>בקשת אישור כניסה רגלי\רכוב</NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to="/requests/type3" onClick={closeDropDown}>בקשת קידוד חוגר</NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to="/requests/type4" onClick={closeDropDown}>בקשת טופס חתימה על שו"ס</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default DropList;
