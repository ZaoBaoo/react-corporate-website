// Firebase
import { ref, onValue, set } from "firebase/database";
import { auth, db } from "../../firebase";

const updateUserDataThunk = (payload) => {
  return async (dispatch) => {
    set(ref(db, `/users/${auth.currentUser.uid}`), payload);
  };
};

export { updateUserDataThunk };
