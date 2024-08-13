import MainHeader from "../Layout/MainHeader";
import RequestFilterBar from "../Requests/RequestFilterBar";
import classes from "./PrivatePage.module.css";
import UserRequestsList from "../Requests/UserRequestsList";

import { getMyOwnRequests } from "../../Services/requests";
import { useEffect, useState } from "react";
import BottomNavigation from "../Requests/BottomNavigation";
import WelcomeBanner from "../Layout/WelcomeBanner";

const PrivatePage = () => {
  const [userRequests, setUserRequests] = useState([]);
  const [skip, setSkip] = useState(0);
  const limit = 5;
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSortByDate, setSelectedSortByDate] =
    useState("createdAt:desc");

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

  return (
    <div>
      <MainHeader />
      <WelcomeBanner />
      <RequestFilterBar
        onStatusChange={handleStatusChange}
        onTypeChange={handleTypeChange}
        onDateChange={handleDateChange}
      />
      <UserRequestsList requests={userRequests} />
      <BottomNavigation onNext={nextButtonHandler} onBack={backButtonHandler} />
    </div>
  );
};

export default PrivatePage;
