import styles from "./Spinner.module.scss";

// Preloader
import spinnerImg from "../../img/preloader.svg";

const Spinner = () => {
  return (
    <div className={styles.wrapperSpinner}>
      <img src={spinnerImg} alt="" />
    </div>
  );
};

export { Spinner };
