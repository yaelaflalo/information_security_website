import classes from "./ApproveButtons.module.css";

const ApproveButtons = ({onApproveHandler, onRejectHandler}) => {
  return (
    <div className={classes.container}>
      <button className={classes.approve} onClick={onApproveHandler}>
        אשר
      </button>
      <button className={classes.reject} onClick={onRejectHandler}>
        דחה
      </button>
    </div>
  );
};

export default ApproveButtons;
