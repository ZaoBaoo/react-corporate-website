// Components
import { Container } from "../Container";

// Style
import styles from "./Push.module.scss";

const Push = () => {
  return (
    <div className={styles.pushBlock}>
      <Container>
        <div className={styles.searchBlock}>
          <div className={styles.search}>
            <input type="search" spellCheck={false} placeholder="Поиск..." />

            <div className={styles.dropdown}>
              <input className={styles.dropBtn} type="text" readOnly={true} />

              <div className={styles.dropdownContent}>
                <div className={styles.textContent}>Фильтр:</div>
                <dir className={styles.groupRadio}>
                  <input type="radio" name="search" id="firstname" />
                  <label htmlFor="firstname">Имя</label>
                </dir>

                <dir className={styles.groupRadio}>
                  <input type="radio" name="search" id="lastname" />
                  <label htmlFor="lastname">Фамиилия</label>
                </dir>

                <dir className={styles.groupRadio}>
                  <input type="radio" name="search" id="job" />
                  <label htmlFor="job">Отдел</label>
                </dir>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export { Push };
