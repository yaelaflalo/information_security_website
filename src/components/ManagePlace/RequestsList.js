import React from "react";
import AvailableRequests from "./AvailableRequests";

const RequestsList = ({ requests, onRefresh, onReject }) => {
  return (
    <ul>
      {requests.map((request, index) => (
        <AvailableRequests
          key={index}
          id={request._id}
          requestType={request.request_type}
          requestStatus={request.status}
          requestDate={`${new Date(request.createdAt).getDate()}/${
            new Date(request.createdAt).getMonth() + 1
          }/${new Date(request.createdAt).getFullYear()}`}
          requestReason={request.request_reason}
          unapprovedReason={request.unapproved_reason}
          onRefresh={onRefresh}
          onReject={onReject}
        />
      ))}
    </ul>
  );
};

export default RequestsList;
