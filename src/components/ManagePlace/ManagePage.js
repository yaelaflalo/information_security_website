import MainHeader from "../Layout/MainHeader";
import classes from "./ManagePage.module.css";

import { getAllRequests } from "../../Services/requests";
import { useEffect, useState } from "react";
import UnapproveDialog from "./UnapproveDialog";
import { setRequestToUnapprove } from "../../Services/requests";
import BottomNavigation from "../Requests/BottomNavigation";
import FilterButtons from "./FilterButtons";
import RequestsList from "./RequestsList";
import WelcomeBanner from "../Layout/WelcomeBanner";

const ManagePage = () => {
  const [usersRequests, setUsersRequests] = useState([]);
  const [skip, setSkip] = useState(0);
  const limit = 5;
  const [refreshRequests, setRefreshRequests] = useState(false);
  const [rejectedRequestId, setRejectedRequestId] = useState("");
  const [typeOfStatus, setTypeOfStatus] = useState("ממתין לאישור...");
  const [selectedSortByDate, setSelectedSortByDate] =
    useState("createdAt:desc");

  const nextButtonHandler = () => {
    setSkip((prevSkip) => prevSkip + limit);
  };

  const backButtonHandler = () => {
    setSkip((prevSkip) => Math.max(prevSkip - limit, 0));
  };

  const handleRefresh = () => {
    setRefreshRequests(!refreshRequests);
  };

  const handleRejectRequest = (requestId) => {
    setRejectedRequestId(requestId);
  };

  const handleDateChange = (selectedOption) => {
    setSelectedSortByDate(selectedOption.value);
  };

  const changeToHistory = () => {
    setTypeOfStatus("");
  };

  const changeToWaitingList = () => {
    setTypeOfStatus("ממתין לאישור...");
  };

  const closeUnapproveDialog = async (unapproveReasonValue) => {
    try {
      await setRequestToUnapprove(rejectedRequestId, {
        unapproved_reason: `${unapproveReasonValue}`,
      });
    } catch (error) {
      console.log(error.message);
      return;
    }
    setRejectedRequestId("");
    handleRefresh();
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getAllRequests(
          typeOfStatus,
          selectedSortByDate,
          limit,
          skip
        );
        setUsersRequests(data);
      } catch (error) {
        console.log("fetch failed");
      }
    };
    fetchRequests();
  }, [skip, refreshRequests, typeOfStatus, selectedSortByDate]);

  return (
    <div>
      <MainHeader />
      <WelcomeBanner />
      <div className={classes.center}>
        <RequestsList
          requests={usersRequests}
          onRefresh={handleRefresh}
          onReject={handleRejectRequest}
        />
      </div>
      <BottomNavigation onNext={nextButtonHandler} onBack={backButtonHandler} />
      {rejectedRequestId !== "" && (
        <UnapproveDialog onSubmit={closeUnapproveDialog} />
      )}
      <FilterButtons
        onHistoryClick={changeToHistory}
        onWaitingListClick={changeToWaitingList}
        onDateChange={handleDateChange}
      />
    </div>
  );
};

export default ManagePage;
