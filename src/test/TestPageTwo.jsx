// Styles
import styles from "./TestPage.module.scss";

// Hooks
import { useLocalStorage } from "./hooks/useLocalStorage";

const TestPageTwo = () => {
  const firstname = useLocalStorage("firstname");
  const lastname = useLocalStorage("lastname");
  const tel = useLocalStorage("tel");

  return (
    <div className={styles.mainTest}>
      <form>
        <label>
          <p>Имя:</p>
          <input {...firstname} type="text" />
          <p style={{ color: "red" }}>{firstname.error}</p>
        </label>
        <label>
          <p>Фамилия:</p>
          <input {...lastname} type="text" />
          <p style={{ color: "red" }}>{lastname.error}</p>
        </label>
        <label>
          <p>Телефон:</p>
          <input {...tel} type="text" />
          <p style={{ color: "red" }}>{tel.error}</p>
        </label>
      </form>
    </div>
  );
};

export { TestPageTwo };
