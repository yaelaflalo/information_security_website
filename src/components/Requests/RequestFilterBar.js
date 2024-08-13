import Select from "react-select";
import { useState } from "react";
import classes from "./RequestFilterBar.module.css";

const filteringDate = [
  { value: "createdAt:desc", label: "מהחדש לישן" },
  { value: "createdAt:asc", label: "מהישן לחדש" },
];

const filteringRequestsType = [
  { value: "בקשת קידוד חוגר", label: "קידוד חוגר" },
  { value: "בקשת השחרה", label: "בקשת השחרה" },
  { value: "בקשת אישור כניסה רגלי או רכוב לבהד", label: "בקשת אישור כניסה" },
  { value: "בקשת טופס חתימה על שוס", label: "בקשת טופס חתימה על שוס" },
  { value: "", label: "כל סוגי הבקשות" },
];

const filteringStatus = [
  { value: "הבקשה אושרה", label: "בקשות שאושרו" },
  { value: "הבקשה נדחתה", label: "בקשות שנדחו" },
  { value: "", label: "כל הבקשות" },
];

const RequestFilterBar = ({ onStatusChange, onTypeChange, onDateChange }) => {
  const [selectedFilteringStatus, setSelectedFilteringStatus] = useState({
    value: "allRequests",
    label: "כל הבקשות",
  });

  const [selectedFilteringRequestsType, setSelectedFilteringRequestsType] =
    useState({ value: "allRequestsTaypes", label: "כל סוגי הבקשות" });

  const [selectedFilteringDate, setSelectedFilteringDate] = useState({
    value: "desc",
    label: "מהחדש לישן",
  });

  const handleStatusChange = (selectedOption) => {
    setSelectedFilteringStatus(selectedOption);
    onStatusChange(selectedOption);
  };

  const handleTypeChange = (selectedOption) => {
    setSelectedFilteringRequestsType(selectedOption);
    onTypeChange(selectedOption);
  };

  const handleDateChange = (selectedOption) => {
    setSelectedFilteringDate(selectedOption);
    onDateChange(selectedOption);
  };

  return (
    <div className={classes.container}>
      סנן לפי:
      <Select
        defaultValue={selectedFilteringStatus}
        onChange={handleStatusChange}
        options={filteringStatus}
        isSearchable
        className={classes["filtering-status-selector"]}
      />
      <Select
        defaultValue={selectedFilteringRequestsType}
        onChange={handleTypeChange}
        options={filteringRequestsType}
        isSearchable
        className={classes["filtering-type-selector"]}
      />
      <Select
        defaultValue={selectedFilteringDate}
        onChange={handleDateChange}
        options={filteringDate}
        isSearchable
        className={classes["filtering-status-selector"]}
      />
    </div>
  );
};

export default RequestFilterBar;
