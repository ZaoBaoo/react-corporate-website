// Components
import styles from "./General.module.scss";
import { Container } from "../Container";

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
