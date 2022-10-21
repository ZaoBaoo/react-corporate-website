import { loginAction } from '../slice/loginSlice';

// Firebase
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const loginByEmailThunk = (payload) => {
  return async (dispatch) => {
    //  Data for payload
    const { emailLogin, passwordLogin } = payload;

    try {
      //
      await signInWithEmailAndPassword(auth, emailLogin, passwordLogin);

      dispatch(loginAction.loginHandler(true));
      //
    } catch (error) {
      let messageError;
      const emailInputname = 'emailLogin';
      const passwordInputname = 'passwordLogin';

      switch (error.message) {
        //
        case 'Firebase: Error (auth/user-not-found).':
          messageError = 'Не удалось найти аккаун с такой почтой';
          dispatch(
            loginAction.setError({
              name: emailInputname,
              message: messageError
            })
          );
          break;
        //
        case 'Firebase: Error (auth/wrong-password).':
          messageError =
            'Неверный пароль. Повторите попытку или нажмите на "Забыли пароль?"';
          dispatch(
            loginAction.setError({
              name: passwordInputname,
              message: messageError
            })
          );
          break;
        //
        case 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).':
          messageError =
            'Доступ временно заблокирован из-за большого количества неудачных попыток, попробуйте позже';
          dispatch(
            loginAction.setError({
              name: passwordInputname,
              message: messageError
            })
          );
          break;
        //
        default:
          dispatch(
            loginAction.setError({
              name: emailInputname,
              message: error.code
            })
          );
          break;
      }
    }
  };
};

export { loginByEmailThunk };
