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
  //do i need to do it in this way or i can use hebrow in the url?

  //   const requestTypes = {
  //     "hashra": "שם הבקשה בעברית"
  //   };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      //check other way. why it doest purse to json
      await addRequest({
        request_type: `${requestType}`,
        request_reason: `${requestReasonValue}`,
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
      <div className={classes.title}>{requestType}</div>
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
