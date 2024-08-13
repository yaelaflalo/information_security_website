import React from "react";
import classes from "./FilterButtons.module.css";

const FilterButtons = ({ onHistoryClick, onWaitingListClick }) => {
  return (
    <div className={classes["filter-buttons"]}>
      <button onClick={onHistoryClick} className={classes.button}>
        היסטורית בקשות
      </button>
      <button onClick={onWaitingListClick} className={classes.button}>
        בקשות שממתינות לאישור
      </button>
    </div>
  );
};

export default FilterButtons;