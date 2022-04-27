import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Store
import { useSelector, useDispatch } from "react-redux";
import { registrationAction } from "../../../store/registration-slice/registration-slice";
import { registrationForEmailThunk } from "../../../store/thunk/registrationThunk";

// Components
import { TitleLogin } from "../../TitleLogin";
import { ModalAndWrapper } from "./ModalAndWrapper";
import { InputLogin } from "../../InputLogin";
import { TextLogin } from "../../TextLogin";
import { ButtonLogin } from "../../ButtonLogin/ButtonLogin";

const RegistrationConfirm = () => {
  //
  const toMain = useNavigate();

  // Dispatch
  const dispatch = useDispatch();

  // Selector registration
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    errorRegistration,
  } = useSelector((state) => state.registration);

  // Selector login

  const { isLoggedIn } = useSelector((state) => state.login);

  // (f) Регистрация
  const signUpHandler = (e) => {
    e.preventDefault();
    const dataForSignUp = { email, password };
    //
    dispatch(registrationForEmailThunk(dataForSignUp));
  };

  // Удаление ошибки
  useEffect(() => {
    return () => dispatch(registrationAction.clearError());
  }, [dispatch]);

  // При удачном входе в аккаун перенаправляет в <Main />
  useEffect(() => {
    if (isLoggedIn) {
      toMain("/");
    }
  }, [isLoggedIn, toMain]);

  return (
    <form action="" onSubmit={signUpHandler}>
      <ModalAndWrapper>
        <TitleLogin title="Подтвердите данные" />
        <InputLogin mode="inputLine" label={firstName} type="text" disabled />
        <InputLogin mode="inputLine" label={lastName} type="text" disabled />
        <InputLogin mode="inputLine" label={email} type="text" disabled />
        <InputLogin mode="inputLine" label={phoneNumber} type="text" disabled />
        {errorRegistration ? <p>{errorRegistration}</p> : null}
        <TextLogin linkedText="изменить данные" linkedTo="/registrationthree" />
        <br />
        <ButtonLogin
          mode="registration"
          name="ЗАРЕГИСТРИРОВАТЬСЯ"
          type="submit"
        />
      </ModalAndWrapper>
    </form>
  );
};

export default RegistrationConfirm;
