import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Store
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

// Error
import { Erorr } from "./components/Erorr";

// TEST
import { TestPage } from "./test/TestPage";
import { TestPageTwo } from "./test/TestPageTwo";

// HOOKs
import { useUserDB } from "./hooks/useUserDB";
import { useLocalStorage } from "./hooks/useLocalStorage";
//

function App() {
  useUserDB();
  useLocalStorage();
  //
  const { isLoggedIn } = useSelector((state) => state.login);
  const { editDisabled } = useSelector((state) => state.modalUser);

  // (e) Проверка. Прошел ли час с момента входа
  // Если прошло больше часа, произойдет выход
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        checkSessionTimeOut(user);
      }
    });
  }, []);

  //
  return (
    <div
      className="app"
      style={editDisabled ? null : { pointerEvents: "none" }}
    >
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
        <Route path="/testPageTwo" element={<TestPageTwo />} />
        <Route path="*" element={<Erorr />} />
      </Routes>
    </div>
  );
}

export default App;
