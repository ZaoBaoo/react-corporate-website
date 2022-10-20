import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';

// Action
import { loginAction } from '../slice/loginSlice';

const forgotPasswordThunk = (payload) => {
  return async (dispatch) => {
    try {
      //
      await sendPasswordResetEmail(auth, payload.forgotPassword);

      // Если ссылка на сброс пароля отправлена
      dispatch(loginAction.setForgotPasswordComplete(true));

      //
    } catch (error) {
      //
      let messageError;
      const emailInputName = 'forgotPassword';

      switch (error.message) {
        case 'Firebase: Error (auth/user-not-found).':
          messageError = 'Не удалось найти аккаун с такой почтой';
          dispatch(
            loginAction.setError({
              name: emailInputName,
              message: messageError
            })
          );
          break;
        default:
          dispatch(
            loginAction.setError({
              name: emailInputName,
              message: error.code
            })
          );

          break;
      }
    }
  };
};

export { forgotPasswordThunk };
