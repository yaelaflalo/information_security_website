import { useParams } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./RequestForm.module.css";
import MainHeader from "../Layout/MainHeader";
import { useState } from "react";

import { addRequest } from "../../Services/requests";

const RequestForm = () => {
  const [requestReasonValue, setRequestReasonValue] = useState("");
  const [isRequestAdded, setIsRequestAdded] = useState(null);

  const requestReasonChangedHandler = (event) => {
    setRequestReasonValue(event.target.value);
  };

  const params = useParams();

  const requestType = params.requestName;

  const requestTypes = {
    type1: "בקשת השחרה",
    type2: "בקשת אישור כניסה רגלי או רכוב לבהד",
    type3: "בקשת קידוד חוגר",
    type4: "בקשת טופס חתימה על שוס",
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await addRequest({
        request_type: requestTypes[requestType],
        request_reason: requestReasonValue,
      });
    } catch (error) {
      console.log(error);
      setIsRequestAdded(false);
      return;
    }
    setIsRequestAdded(true);
    setRequestReasonValue("");
  };

  return (
    <div>
      <MainHeader />
      <div className={classes.title}>{requestTypes[requestType]}</div>
      <div className={classes["form-container"]}>
        <Card>
          <form onSubmit={submitHandler}>
            <div>
              <input
                type="text"
                id="requestReason"
                placeholder="סיבת הגשת הבקשה"
                value={requestReasonValue}
                onChange={requestReasonChangedHandler}
                className={classes.input}
              />
            </div>
            <button className={classes.button}>העלו בקשה!</button>
          </form>
        </Card>
        {isRequestAdded === true && (
          <div className={classes["success-text"]}>הבקשה נקלטה בהצלחה!</div>
        )}
        {isRequestAdded === false && (
          <div className={classes["unsuccess-text"]}>קליטת הבקשה נכשלה!</div>
        )}
      </div>
    </div>
  );
};

export default RequestForm;
