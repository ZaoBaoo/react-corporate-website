import styles from "./TitleLogin.module.scss";

const TitleLogin = ({ title }) => {
  return <h1 className={styles.titleBig}>{title}</h1>;
};

export { TitleLogin };
