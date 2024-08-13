import React from "react";
import classes from "./BottomNavigation.module.css";

const Pagination = ({ onNext, onBack }) => {
  return (
    <div className={classes["flex-box"]}>
      <div onClick={onBack}>&lt;</div>
      <div onClick={onNext}>&gt;</div>
    </div>
  );
};

export default Pagination;