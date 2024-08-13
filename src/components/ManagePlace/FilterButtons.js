import classes from "./FilterButtons.module.css";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const filteringDate = [
  { value: "createdAt:desc", label: "מהחדש לישן" },
  { value: "createdAt:asc", label: "מהישן לחדש" },
];

const FilterButtons = ({
  onHistoryClick,
  onWaitingListClick,
  onDateChange,
  onDateRangeChange,
  startDate,
  endDate,
}) => {
  const [selectedFilteringDate, setSelectedFilteringDate] = useState({
    value: "desc",
    label: "מהחדש לישן",
  });

  const handleDateChange = (selectedOption) => {
    setSelectedFilteringDate(selectedOption);
    onDateChange(selectedOption);
  };

  const handleStartDateChange = (date) => {
    onDateRangeChange(date, endDate);
  };

  const handleEndDateChange = (date) => {
    onDateRangeChange(startDate, date);
  };

  return (
    <div className={classes["filter-buttons"]}>
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat="yyyy-MM-dd"
        className={classes.picker}
      />
      <div>:לתאריך</div>
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        dateFormat="yyyy-MM-dd"
        className={classes.picker}
      />
      <div>:מתאריך</div>

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
