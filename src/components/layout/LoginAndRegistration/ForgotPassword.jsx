import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

//Firebase
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase';

// Components
import { ModalAndWrapper } from './ModalAndWrapper';
import { InputLogin } from '../../InputLogin';
import { TitleLogin } from '../../TitleLogin';
import { ButtonLogin } from '../../ButtonLogin';
import { forgotPasswordThunk } from '../../../store/thunk/forgotPasswordThunk';

// Action
import { loginAction } from '../../../store/slice/loginSlice';

// Hook-form
import { emailVal } from './Validate';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { errorLogin, forgotPasswordComplete } = useSelector(
    (state) => state.login
  );

  // HOOK USE FORM
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError
  } = useForm({ mode: 'onSubmit' });

  // (f) Сброс пароля
  const handlerForgotPassword = (data) => {
    setLoading(true);
    // Удаление ошибки из store(если она есть)
    dispatch(loginAction.clearErrorHandler());
    // Пытаемся сбросить пароль
    dispatch(forgotPasswordThunk(data));
  };

  // (e) Если есть ошибка
  useEffect(() => {
    // Проверяем наличие свойст у объекта с ошибками
    const isError = Object.keys(errorLogin).length;

    if (isError) {
      setError(errorLogin.name, { message: errorLogin.message });
      setLoading(false);
    }
  }, [errorLogin, setError]);

  // (e) Когда thunk сброса пароля отработал
  useEffect(() => {
    if (forgotPasswordComplete) {
      dispatch(loginAction.setForgotPasswordComplete(null));
      setLoading(false);
      navigate('/reset-password-complete');
    }
  }, [forgotPasswordComplete, navigate, dispatch]);

  return (
    <form action="" onSubmit={handleSubmit(handlerForgotPassword)}>
      <ModalAndWrapper>
        <TitleLogin title="Восстановления пароля" />
        <InputLogin
          errors={errors}
          register={register}
          val={emailVal}
          name="forgotPassword"
          mode="inputBorder"
          label="Почта"
          type="email"
          autoFocus
        />

        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '1.5rem'
          }}
        >
          <Link to="/login">
            <ButtonLogin mode="registration" name="Назад" />
          </Link>

          <ButtonLogin
            mode="registration"
            name="Отправить"
            type="submit"
            loading={loading}
          />
        </div>
      </ModalAndWrapper>
    </form>
  );
};

export { ForgotPassword };
