import { useEffect } from "react";

// Firebase
import { auth, db } from "../../../firebase";

// Store
import { useDispatch, useSelector } from "react-redux";
import { getDBUserThunk } from "../../../store/thunk/getUserDBThunk";
import { loginAction } from "../../../store/slice/loginSlice";
import { userDBAction } from "../../../store/slice/userDBSlice";

const Main = () => {
  const dispatch = useDispatch();

  const { isDataReceived } = useSelector((state) => state.userDB);
  const { isLoggedIn } = useSelector((state) => state.login);

  // (f)
  const logOutHandler = () => {
    auth.signOut();
    dispatch(loginAction.loginHandler({ isLoggedIn: false }));
    dispatch(userDBAction.clearUserData());
  };

  // (e)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log("main");
      if (user && isLoggedIn) {
        isDataReceived ||
          dispatch(getDBUserThunk({ uid: auth.currentUser.uid }));
      }
    });
  }, [dispatch, isLoggedIn, isDataReceived]);

  return (
    <>
      <h1>MAIN</h1>
      <button onClick={logOutHandler}>LogOut</button>
    </>
  );
};

export { Main };
