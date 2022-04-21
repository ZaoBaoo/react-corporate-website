import styles from "./TitleLogin.module.scss";
// import "../../index.css";

const TitleLogin = ({ title }) => {
  return <h1 className={styles.titleBig}>{title}</h1>;
};

export { TitleLogin };
