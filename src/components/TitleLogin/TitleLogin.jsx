import styles from './TitleLogin.module.scss';

const TitleLogin = ({ title, ...otherProps }) => {
  return (
    <h1 className={styles.titleBig} {...otherProps}>
      {title}
    </h1>
  );
};

export { TitleLogin };
