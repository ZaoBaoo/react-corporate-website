// Action
import { userDBAction } from "../slice/userDBSlice";
import { loginAction } from "../slice/loginSlice";

// Firebase
import { auth, db } from "../../firebase";
import { get, ref } from "firebase/database";

export const getDBUserThunk = (user) => {
  return async (dispatch) => {
    //
    console.log("getDB");
    //
    const response = await get(ref(db, `/users/${user.uid}`));

    dispatch(userDBAction.setUserData(response.val()));

    const authData = JSON.parse(localStorage.getItem("authData"));

    // Если мы логинемся то диспатч сработает
    // Иначи мы просто сделаем запрос в базу юзера
    authData?.isLoggedIn ||
      dispatch(
        loginAction.loginHandler({
          isLoggedIn: true,
          uid: user.uid,
          accessToken: user.accessToken,
        })
      );
  };
};
