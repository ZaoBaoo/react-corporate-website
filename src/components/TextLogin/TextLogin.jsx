import { Link } from "react-router-dom";

import styles from "./TextLogin.module.scss";

const TextLogin = ({ text, linked, posLeft }) => {
  const { textLogin, textLinkedLogin, right } = styles;

  return (
    <div className={posLeft && right}>
      <span className={textLogin}>{text}</span>
      {linked && (
        <Link to="login">
          <span className={textLinkedLogin}>{linked}</span>
        </Link>
      )}
    </div>
  );
};

export { TextLogin };
