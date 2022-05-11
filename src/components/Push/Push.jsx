// Components
import { Container } from "../Container";

// Style
import styles from "./Push.module.scss";

const Push = ({ children }) => {
  return (
    <div className={styles.pushBlock}>
      <Container>
        <div className={styles.pushGeneral}>
          <div className={styles.pushContent}>{children}</div>
        </div>
      </Container>
    </div>
  );
};

export { Push };
