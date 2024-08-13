import MainHeader from "../Layout/MainHeader";
import RequestFilterBar from "../Requests/RequestFilterBar";
import UserRequestsList from "../Requests/UserRequestsList";

import { getMyOwnRequests } from "../../Services/requests";
import { useEffect, useState } from "react";
import BottomNavigation from "../Requests/BottomNavigation";
import WelcomeBanner from "../Layout/WelcomeBanner";

const PrivatePage = () => {
  const [filterState, setFilterState] = useState({
    selectedStatus: "",
    selectedType: "",
    selectedSortByDate: "createdAt:desc",
    skip: 0,
  });

  const limit = 5;
  const [userRequests, setUserRequests] = useState([]);

  const handleStatusChange = (selectedOption) => {
    setFilterState((prevState) => ({
      ...prevState,
      selectedStatus: selectedOption.value,
    }));
  };

  const handleTypeChange = (selectedOption) => {
    setFilterState((prevState) => ({
      ...prevState,
      selectedType: selectedOption.value,
    }));
  };

  const handleDateChange = (selectedOption) => {
    setFilterState((prevState) => ({
      ...prevState,
      selectedSortByDate: selectedOption.value,
    }));
  };

  const nextButtonHandler = () => {
    setFilterState((prevState) => ({
      ...prevState,
      skip: prevState.skip + limit,
    }));
  };

  const backButtonHandler = () => {
    setFilterState((prevState) => ({
      ...prevState,
      skip: Math.max(prevState.skip - limit, 0),
    }));
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getMyOwnRequests(
          filterState.selectedStatus,
          filterState.selectedType,
          filterState.selectedSortByDate,
          limit,
          filterState.skip
        );
        setUserRequests(data);
      } catch (error) {
        console.log("fetch failed");
      }
    };
    fetchRequests();
  }, [
    filterState.skip,
    filterState.selectedStatus,
    filterState.selectedType,
    filterState.selectedSortByDate,
  ]);

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
