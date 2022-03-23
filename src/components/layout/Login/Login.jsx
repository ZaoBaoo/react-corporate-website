import styles from "./Login.module.scss";

import { InputLogin } from "../../InputLogin";
import { TitleLogin } from "../../TitleLogin";
import { TextLogin } from "../../TextLogin";
import { ButtonLogin } from "../../ButtonLogin/ButtonLogin";

const Login = () => {
  return (
    <div className={styles.blockWrapper}>
      <div className={styles.modal}>
        <TitleLogin title="Корпоративная сеть" />
        <InputLogin label="Почта" />
        <TextLogin text="Забыли пароль?" posLeft="right" />
        <InputLogin label="Пароль" />
        <TextLogin text="Нет учетной записи?" linked=" Создать." />
        <ButtonLogin name="Войти" />
      </div>
    </div>
  );
};

export { Login };
