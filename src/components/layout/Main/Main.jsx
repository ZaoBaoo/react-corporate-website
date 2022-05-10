import { useState } from "react";
// Firebase
import { auth } from "../../../firebase";

// ID
import { v4 as idGenerator } from "uuid";

// Store
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../../store/slice/loginSlice";
import { userDBAction } from "../../../store/slice/userDBSlice";

// Components
import { Header } from "../../Header";
import { Push } from "../../Push";
import { Container } from "../../Container";

// Style
import styles from "./Main.module.scss";

const Main = () => {
  const { userData } = useSelector((state) => state.userDB);

  return (
    <>
      <Header />
      <Push />
    </>
  );
};

export { Main };
