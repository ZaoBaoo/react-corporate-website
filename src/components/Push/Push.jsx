// Components
import { Container } from "../Container";

// Style
import styles from "./Push.module.scss";

const Push = ({ children }) => {
  return (
    <div className={styles.pushBlock}>
      <Container>
        <div className={styles.pushContent}>{children}</div>
      </Container>
    </div>
  );
};

export { Push };
