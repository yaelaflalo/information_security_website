import RequestItem from "../Requests/RequestItem/RequestItem";
import ApproveButtons from "./ApproveButtons";
import classes from "./AvailableRequests.module.css";

import { setRequestToApprove } from "../../Services/requests";

const AvailableRequests = ({
  id,
  requestType,
  requestStatus,
  requestDate,
  requestReason,
  unapprovedReason,
  requestOwnerEmail,
  onRefresh,
  onReject,
}) => {
  const onApproveHandler = async () => {
    try {
      await setRequestToApprove(id);
    } catch (error) {
      console.log(error.message);
    }
    onRefresh();
  };

  const onRejectHandler = () => {
    onReject(id);
  };

  return (
    <li>
      <div className={classes.container}>
        <RequestItem
          key={id}
          requestType={requestType}
          requestStatus={requestStatus}
          requestDate={requestDate}
          requestReason={requestReason}
          unapprovedReason={unapprovedReason}
        >
          <div className={classes.email}>{requestOwnerEmail}</div>
          <ApproveButtons
            onApproveHandler={onApproveHandler}
            onRejectHandler={onRejectHandler}
            onRefresh={onRefresh}
          />
        </RequestItem>
      </div>
    </li>
  );
};

export default AvailableRequests;
