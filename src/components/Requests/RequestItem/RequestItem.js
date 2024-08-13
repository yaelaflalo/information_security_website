import Card from "../../UI/Card";
import classes from "./RequestItem.module.css";

const RequestItem = ({
  requestType,
  requestReason,
  requestStatus,
  unapprovedReason,
  requestDate,
  children,
}) => {
  return (
    <div className={classes["request-container"]}>
      <Card>
        <li>
          <div className={classes["flex-container"]}>
            <div className={classes["data"]}>
              <div>
                <span className={classes["sub-title"]}>סוג הבקשה: </span>
                {requestType}
              </div>
              <div>
                <span className={classes["sub-title"]}>סיבת הבקשה: </span>
                {requestReason}
              </div>
            </div>
            <div className={classes["status"]}>
              {requestStatus === "ממתין לאישור..." && (
                <span className={classes["waiting"]}>ממתין לאישור...</span>
              )}
              {requestStatus === "הבקשה אושרה" && (
                <span className={classes["green"]}>הבקשה אושרה</span>
              )}
              {requestStatus === "הבקשה נדחתה" && (
                <div>
                  <span className={classes["red"]}>
                    הבקשה נדחתה!
                    <br></br> סיבת הדחייה: {unapprovedReason}
                  </span>
                </div>
              )}
            </div>
            <div className={classes["date"]}>
              <div>תאריך הבקשה: </div>
              {requestDate}
            </div>
            {children}
          </div>
        </li>
      </Card>
    </div>
  );
};

export default RequestItem;
