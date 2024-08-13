import classes from "./FilterButtons.module.css";
import Select from "react-select";
import { useState } from "react";

const filteringDate = [
    { value: "createdAt:desc", label: "מהחדש לישן" },
    { value: "createdAt:asc", label: "מהישן לחדש" },
  ];

const FilterButtons = ({ onHistoryClick, onWaitingListClick, onDateChange }) => {
    const [selectedFilteringDate, setSelectedFilteringDate] =
    useState({value: "desc", label: "מהחדש לישן" });

    const handleDateChange = (selectedOption) => {
        setSelectedFilteringDate(selectedOption);
        onDateChange(selectedOption);
      }

  return (
    <div className={classes["filter-buttons"]}>
        <Select
        defaultValue={selectedFilteringDate}
        onChange={handleDateChange}
        options={filteringDate}
        isSearchable
        className={classes["filtering-date-selector"]}
      />
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