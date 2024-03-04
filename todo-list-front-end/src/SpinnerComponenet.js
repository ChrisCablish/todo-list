import Spinner from "react-bootstrap/Spinner";
import styles from "./SpinnerComponent.module.scss";

const SpinnerComponent = () => {
  return (
    <div className={styles.spinnerContainer}>
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <span>
        "Hang tight for for a minute or two. You're experiencing a brief delay
        because this application uses a serverless database that is initializing
        from an auto-paused state to conserve resources.
      </span>
    </div>
  );
};

export default SpinnerComponent;
