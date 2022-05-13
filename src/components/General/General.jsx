// Components
import styles from "./General.module.scss";
import { Container } from "../Container";
import miniUserIcon from "../../img/miniUserIcon.png";
import messageIcon from "../../img/messageIcon.svg";

const General = ({ children }) => {
  return (
    <div className={styles.generalBlock}>
      <Container>
        <div className={styles.generalContent}>{children}</div>
      </Container>
    </div>
  );
};

export { General };
