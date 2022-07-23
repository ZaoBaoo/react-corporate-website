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
import { General } from "../../General";
import { LeftSide } from "../../LeftSide";
import { RightSide } from "../../RightSide";
import { Spinner } from "../../Spinner";

// Style
import styles from "./Main.module.scss";

// Hook
import { useMobile } from "../../../hooks/useMobile";

const Main = () => {
  useMobile();

  const { usersData } = useSelector((state) => state.userDB);
  const { isMobileSize } = useSelector((state) => state.mobile);
  const { showModal } = useSelector((state) => state.modalUser);

  // Пока приложение не получило usersData (список пользователей из БД)
  // Будет крутиться спиннер
  return (
    <>
      {!usersData ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <Push>
            <Search />
          </Push>
          <General>
            <LeftSide />
            {(isMobileSize && !showModal) || <RightSide />}
          </General>

          {isMobileSize || <Push />}
        </>
      )}
    </>
  );
};

export { Main };
