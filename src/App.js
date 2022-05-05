import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Store
import { loginAction } from "./store/slice/loginSlice";
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
  RegistrationConfirm,
} from "./components/layout/LoginAndRegistration";
import { Erorr } from "./components/Erorr";

// TEST
import { TestPage } from "./test/TestPage";

//
//

function App() {
  //
  const { isLoggedIn } = useSelector((state) => state.login);
  //
  const dispatch = useDispatch();
  //
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        checkSessionTimeOut(user);
      }
      // if (!user) {
      //   dispatch(loginAction.loginHandler({ isLoggedIn: false }));
      // }
    });
  }, [dispatch]);
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
