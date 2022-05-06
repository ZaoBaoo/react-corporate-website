// // Store
// import { registrationAction } from "../slice/registrationSlice";

// // Firebase
// import { ref, set } from "firebase/database";
// import { auth, db } from "../../firebase";
// import { useSelector } from "react-redux";

// const setUserDBThunk = (payload) => {
//   return async (dispatch) => {
//     await set(ref(db, `/users/${auth.currentUser.uid}`), payload);
//   };
// };

// export { setUserDBThunk };
