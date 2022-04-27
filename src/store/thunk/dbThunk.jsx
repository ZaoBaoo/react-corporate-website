// Action
import { dbAction } from "../db-slice/db-slice";

// Firebase
import { auth, db } from "../../firebase";
import { get, ref, set } from "firebase/database";

const getUserForDB = (payload) => {
  return async (dispatch) => {
    //
    const response = await get(ref(db, `/users/${auth.currentUser.uid}`));

    const userDataFromDB = response.val();

    if (userDataFromDB) {
      dispatch(dbAction.setDBData(userDataFromDB));
    } else {
      await set(ref(db, `/users/${auth.currentUser.uid}`), payload);

      const response = await get(ref(db, `/users/${auth.currentUser.uid}`));

      dispatch(dbAction.setDBData(response.val()));
    }

    //
  };
};

export { getUserForDB };
