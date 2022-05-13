import { useState, useEffect } from "react";
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
import { Search } from "../../Search";
import { Container } from "../../Container";
import { General } from "../../General";
import { LeftSide } from "../../LeftSide";
import { RightSide } from "../../RightSide";

// Style
import styles from "./Main.module.scss";

// Hook
import { useMobile } from "../../../hooks/useMobile";

const Main = () => {
  useMobile();
  return (
    <>
      <Header />
      <Push>
        <Search />
      </Push>
      <General>
        <LeftSide />
        <RightSide />
      </General>

      <Push />
    </>
  );
};

export { Main };
