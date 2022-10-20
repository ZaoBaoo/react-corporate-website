import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Store
import { useSelector, useDispatch } from 'react-redux';
import { userDBAction } from './store/slice/userDBSlice';
import { loginAction } from './store/slice/loginSlice';

// Firebase
import { auth } from './firebase';

// Tool
import { checkAuthTime } from './tool-function/checkAuthTime';

// Layout
import { Main } from './components/layout/Main/Main';
import {
  Login,
  RegistrationOne,
  RegistrationTwo,
  RegistrationThree,
  RegistrationConfirm,
  ForgotPassword,
  ResetPasswordComplete
} from './components/layout/LoginAndRegistration';

// Error
import { ErrorPage } from './components/ErrorPage';

// TEST
import { TestPage } from './test/TestPage';
import { TestPageTwo } from './test/TestPageTwo';

// HOOKs
import { useUserDB } from './hooks/useUserDB';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useFixVH } from './hooks/useFixVH';
//

function App() {
  useUserDB();
  useLocalStorage();
  useFixVH();

  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.login);
  const { editDisabled } = useSelector((state) => state.modalUser);

  // (e) Проверка. Прошел ли час с момента входа
  // Если прошло больше часа, произойдет выход
  useEffect(() => {
    let resetTimer;
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const timeAuth = user.reloadUserInfo.lastLoginAt;
        resetTimer = setInterval(async () => {
          const isAuthTimeValid = checkAuthTime(timeAuth);
          if (!isAuthTimeValid) {
            clearInterval(resetTimer);
            await auth.signOut();
            dispatch(userDBAction.clearUserData());
            dispatch(loginAction.loginHandler(false));

            console.log('Вы разлогинены');
            return;
          }
        }, 5000);
      }
    });
    return () => {
      unsubscribe();
      clearInterval(resetTimer);
    };
  }, []);

  //
  return (
    <div
      className="app"
      style={editDisabled ? null : { pointerEvents: 'none' }}
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
          path="/forgot-password"
          element={
            isLoggedIn ? <Navigate replace to="/" /> : <ForgotPassword />
          }
        />
        <Route
          path="/reset-password-complete"
          element={<ResetPasswordComplete />}
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
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
