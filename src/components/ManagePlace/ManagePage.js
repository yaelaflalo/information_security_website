import MainHeader from "../Layout/MainHeader";
import classes from "./ManagePage.module.css";

import { getAllRequests, setRequestToUnapprove } from "../../Services/requests";
import { useEffect, useState } from "react";
import UnapproveDialog from "./UnapproveDialog";
import BottomNavigation from "../Requests/BottomNavigation";
import FilterButtons from "./FilterButtons";
import RequestsList from "./RequestsList";
import WelcomeBanner from "../Layout/WelcomeBanner";

const ManagePage = () => {
  const [state, setState] = useState({
    usersRequests: [],
    skip: 0,
    refreshRequests: false,
    rejectedRequestId: "",
    typeOfStatus: "ממתין לאישור...",
    selectedSortByDate: "createdAt:desc",
  });

  const limit = 5;

  const handleRefresh = () => {
    setState((prevState) => ({
      ...prevState,
      refreshRequests: !prevState.refreshRequests,
    }));
  };

  const handleRejectRequest = (requestId) => {
    setState((prevState) => ({
      ...prevState,
      rejectedRequestId: requestId,
    }));
  };

  const handleDateChange = (selectedOption) => {
    setState((prevState) => ({
      ...prevState,
      selectedSortByDate: selectedOption.value,
    }));
  };

  const changeToHistory = () => {
    setState((prevState) => ({
      ...prevState,
      typeOfStatus: "הבקשה אושרה,הבקשה נדחתה",
    }));
  };

  const changeToWaitingList = () => {
    setState((prevState) => ({
      ...prevState,
      typeOfStatus: "ממתין לאישור...",
    }));
  };

  const closeUnapproveDialog = async (unapproveReasonValue) => {
    try {
      await setRequestToUnapprove(state.rejectedRequestId, {
        unapproved_reason: unapproveReasonValue,
      });
      setState((prevState) => ({
        ...prevState,
        rejectedRequestId: "",
      }));
      handleRefresh();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePagination = (direction) => {
    setState((prevState) => ({
      ...prevState,
      skip:
        direction === "next"
          ? prevState.skip + limit
          : Math.max(prevState.skip - limit, 0),
    }));
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getAllRequests(
          state.typeOfStatus,
          state.selectedSortByDate,
          limit,
          state.skip
        );
        setState((prevState) => ({
          ...prevState,
          usersRequests: data,
        }));
      } catch (error) {
        console.log("fetch failed");
      }
    };
    fetchRequests();
  }, [
    state.skip,
    state.refreshRequests,
    state.typeOfStatus,
    state.selectedSortByDate,
  ]);

  return (
    <div>
      <MainHeader />
      <WelcomeBanner />
      <div className={classes.center}>
        <RequestsList
          requests={state.usersRequests}
          onRefresh={handleRefresh}
          onReject={handleRejectRequest}
        />
      </div>
      <BottomNavigation
        onNext={() => handlePagination("next")}
        onBack={() => handlePagination("back")}
      />
      {state.rejectedRequestId !== "" && (
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
