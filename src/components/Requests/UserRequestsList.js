import RequestItem from "./RequestItem/RequestItem";
import classes from "./UserRequestList.module.css";

const UserRequestsList = ({ requests }) => {
  return (
    <div className={classes.center}>
      <ul>
        {requests.map((request, index) => (
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
        ))}
      </ul>
    </div>
  );
};

export default UserRequestsList;
