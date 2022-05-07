// Components
import { Container } from "../Container";
import { InformationPanel } from "../InformationPanel";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <InformationPanel />
      </Container>
    </header>
  );
};

export { Header };
