import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { loginByEmailThunk } from "../../../store/thunk/loginByEmailThunk";

// Action
import { loginAction } from "../../../store/slice/loginSlice";

// Components
import { ModalAndWrapper } from "./ModalAndWrapper";
import { InputLogin } from "../../InputLogin";
import { TitleLogin } from "../../TitleLogin";
import { TextLogin } from "../../TextLogin";
import { ButtonLogin } from "../../ButtonLogin";

// Hook-form
import { emailVal, passVal } from "./Validate";

const Login = () => {
  const [loading, setLoading] = useState(false);
  // Selector store
  const { errorLogin, isLoggedIn } = useSelector((state) => state.login);

  const refButtonNextPage = useRef(null);

  // dispatch
  const dispatch = useDispatch();

  // HOOK USE FORM
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm({ mode: "onSubmit" });

  // (f) АВТОРИЗАЦИЯ
  const handlerLogin = (data) => {
    setLoading(true);
    // Удаление ошибки из store(если она есть)
    dispatch(loginAction.clearErrorHandler());
    // Пытаемся войти
    dispatch(loginByEmailThunk(data));
  };

  useEffect(() => {
    if (errorLogin?.message) {
      setLoading(false);
    }
    if (isLoggedIn) {
      setLoading(false);
    }
  }, [isLoggedIn, errorLogin]);

  // (e) Удаление ошибки при перерендере
  useEffect(() => {
    dispatch(loginAction.clearErrorHandler());
  }, [dispatch]);

  // (e) Установка ошибки если она появляется в STORE
  useEffect(() => {
    // Проверяем наличие свойст у объекта с ошибками
    const isError = Object.keys(errorLogin).length;

    if (isError) {
      setError(errorLogin.name, { message: errorLogin.message });
    }
  }, [errorLogin, setError]);

  // (e) Удаление ошибки если она отсутвствует в STORE
  useEffect(() => {
    // Проверяем наличие свойст у объекта с ошибками
    const isError = Object.keys(errorLogin).length;

    if (!isError) {
      clearErrors();
    }
  }, [errorLogin, clearErrors]);

  return (
    <form action="" onSubmit={handleSubmit(handlerLogin)}>
      <ModalAndWrapper>
        <TitleLogin title="Корпоративная сеть" />
        <InputLogin
          errors={errors}
          register={register}
          val={emailVal}
          name="emailLogin"
          mode="inputBorder"
          label="Почта"
          type="email"
          autoFocus
          refButtonNextPage={refButtonNextPage}
        />
        <TextLogin text="Забыли пароль?" position="right" />
        <InputLogin
          errors={errors}
          register={register}
          val={passVal}
          name="passwordLogin"
          mode="inputBorder"
          label="Пароль"
          type="password"
          refButtonNextPage={refButtonNextPage}
        />
        <TextLogin
          text="Нет учетной записи?"
          linkedText=" Создать."
          linkedTo="/registrationone"
        />

        <ButtonLogin
          mode="login"
          name="Войти"
          type="submit"
          ref={refButtonNextPage}
          //
          loading={loading}
        />
      </ModalAndWrapper>
    </form>
  );
};

export { Login };
