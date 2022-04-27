import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Store
import { loginAction } from "./store/login-slice/login-slice";
import { dbAction } from "./store/db-slice/db-slice";
import { getUserForDB } from "./store/thunk/dbThunk";
import { useDispatch, useSelector } from "react-redux";

// Firebase
import { auth } from "./firebase";

// Tool
import { checkSessionTimeOut } from "./tool-function";

// Layout
import { Main } from "./components/layout/Main/Main";
import {
  Login,
  RegistrationOne,
  RegistrationTwo,
  RegistrationThree,
} from "./components/layout/LoginAndRegistration";
import { Erorr } from "./components/Erorr";
import RegistrationConfirm from "./components/layout/LoginAndRegistration/RegistrationConfirm";

// TEST
import { TestPage } from "./test/TestPage";

//

//

function App() {
  const dispatch = useDispatch();

  // state login
  const { isLoggedIn } = useSelector((state) => state.login);
  const { dataReceived } = useSelector((state) => state.db);

  // (e) Автоматический выход из системы через 1 час
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("use");
        localStorage.getItem("isLoggedIn") === "true" &&
          dispatch(loginAction.loginHandler(true));

        dataReceived || dispatch(getUserForDB({ test: "test" }));
        dataReceived && dispatch(loginAction.loginHandler(true));
        dataReceived && checkSessionTimeOut(user);
        //
      } else {
        // Если нет сессии меняем state и LS (isLoggedIn) на false
        // И очищаем DB
        localStorage.setItem("isLoggedIn", false);
        dispatch(loginAction.loginHandler(false));
        dispatch(dbAction.clearDBData());
      }
    });
  }, [dispatch, dataReceived]);
  //
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Main /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          path="/registrationone"
          element={
            isLoggedIn ? <Navigate replace to="/" /> : <RegistrationOne />
          }
        />
        <Route
          path="/registrationtwo"
          element={
            isLoggedIn ? <Navigate replace to="/" /> : <RegistrationTwo />
          }
        />
        <Route
          path="/registrationthree"
          element={
            isLoggedIn ? <Navigate replace to="/" /> : <RegistrationThree />
          }
        />
        <Route
          path="/registrationconfirm"
          element={
            isLoggedIn ? <Navigate replace to="/" /> : <RegistrationConfirm />
          }
        />
        <Route path="/testPage" element={<TestPage />} />
        <Route path="*" element={<Erorr />} />
      </Routes>
    </div>
  );
}

export default App;
