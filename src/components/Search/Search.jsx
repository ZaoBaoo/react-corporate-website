// Style
import styles from "./Search.module.scss";

const Search = () => {
  return (
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
            <label htmlFor="lastname">Фамилия</label>
          </dir>

          <dir className={styles.groupRadio}>
            <input type="radio" name="search" id="job" />
            <label htmlFor="job">Отдел</label>
          </dir>
        </div>
      </div>
    </div>
  );
};

export { Search };
