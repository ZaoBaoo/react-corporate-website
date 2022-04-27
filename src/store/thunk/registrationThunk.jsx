import { registrationAction } from "../registration-slice/registration-slice";
import { loginAction } from "../login-slice/login-slice";

// Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const registrationForEmailThunk = (payload) => {
  return async (dispatch) => {
    const { email, password } = payload;

    try {
      //
      await createUserWithEmailAndPassword(auth, email, password);
      //
    } catch (error) {
      console.log(error.message);
      let messageError;

      switch (error.message) {
        case "Firebase: Error (auth/email-already-in-use).":
          messageError = "Ошибка: данный email уже зарегистрирован в системе";
          dispatch(registrationAction.setError(messageError));
          break;

        default:
          dispatch(registrationAction.setError(error.error.message));
          break;
      }
    }
  };
};

export { registrationForEmailThunk };
