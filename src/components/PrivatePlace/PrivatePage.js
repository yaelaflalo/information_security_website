import MainHeader from "../Layout/MainHeader";
import RequestFilterBar from "../Requests/RequestFilterBar";
import RequestItem from "../Requests/RequestItem/RequestItem";
import classes from "./PrivatePage.module.css";

import { getMyOwnRequests } from "../../Services/requests";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user-context";
import BottomNavigation from "../Requests/BottomNavigation";

const PrivatePage = () => {
  const [userRequests, setUserRequests] = useState([]);
  const [skip, setSkip] = useState(0);
  const limit = 5;
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSortByDate, setSelectedSortByDate] =
    useState("createdAt:desc");
  const { userName } = useContext(UserContext);

  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption.value);
  };

  const handleTypeChange = (selectedOption) => {
    setSelectedType(selectedOption.value);
  };

  const handleDateChange = (selectedOption) => {
    setSelectedSortByDate(selectedOption.value);
  };

  const nextButtonHandler = () => {
    setSkip((prevSkip) => prevSkip + limit);
  };

  const backButtonHandler = () => {
    setSkip((prevSkip) => Math.max(prevSkip - limit, 0));
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getMyOwnRequests(
          selectedStatus,
          selectedType,
          selectedSortByDate,
          limit,
          skip
        );
        setUserRequests(data);
      } catch (error) {
        console.log("fetch failed");
      }
    };
    fetchRequests();
  }, [skip, selectedStatus, selectedType, selectedSortByDate]);

  const userRequestList = userRequests.map((request, index) => (
    <RequestItem
      key={index}
      requestType={request.request_type}
      requestStatus={request.status}
      requestDate={`${new Date(request.createdAt).getDate()}/${
        new Date(request.createdAt).getMonth() + 1
      }/${new Date(request.createdAt).getFullYear()}`}
      requestReason={request.request_reason}
      unapprovedReason={request.unapproved_reason}
    />
  ));

  return (
    <div>
      <MainHeader />
      <div className={classes["welcome-sign"]}>ברוך שובך {userName}!</div>
      <RequestFilterBar
        onStatusChange={handleStatusChange}
        onTypeChange={handleTypeChange}
        onDateChange={handleDateChange}
      />
      <div className={classes.center}>
        <ul>{userRequestList}</ul>
      </div>
      <BottomNavigation onNext={nextButtonHandler} onBack={backButtonHandler} />
    </div>
  );
};

export default PrivatePage;
