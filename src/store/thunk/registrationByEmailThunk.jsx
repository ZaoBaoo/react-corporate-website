import { registrationAction } from "../slice/registrationSlice";
import { loginAction } from "../slice/loginSlice";

// Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const registrationByEmailThunk = (payload) => {
  return async (dispatch) => {
    const { email, password } = payload;

    try {
      //
      const res = await createUserWithEmailAndPassword(auth, email, password);
      //
      console.log(res.user);
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

export { registrationByEmailThunk };
