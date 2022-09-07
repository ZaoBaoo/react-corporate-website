import { useEffect, useState } from "react";

// Store
import { useSelector, useDispatch } from "react-redux";
import { registrationAction } from "../../../store/slice/registrationSlice";
import { registrationByEmailThunk } from "../../../store/thunk/registrationByEmailThunk";

// Components
import { TitleLogin } from "../../TitleLogin";
import { ModalAndWrapper } from "./ModalAndWrapper";
import { InputLogin } from "../../InputLogin";
import { TextLogin } from "../../TextLogin";
import { ButtonLogin } from "../../ButtonLogin/ButtonLogin";

const RegistrationConfirm = () => {
  const [loading, setLoading] = useState(false);

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

  const { isLoggedIn } = useSelector((state) => state.login);

  // (f) Регистрация
  const signUpHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    const dataForSignUp = { firstName, lastName, email, phoneNumber, password };
    //
    dispatch(registrationByEmailThunk(dataForSignUp));
  };

  useEffect(() => {
    if (errorRegistration) {
      setLoading(false);
    }
    if (isLoggedIn) {
      setLoading(false);
    }
  }, [errorRegistration, isLoggedIn]);

  // Удаление ошибки
  useEffect(() => {
    return () => dispatch(registrationAction.clearError());
  }, [dispatch]);

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
          //
          loading={loading}
        />
      </ModalAndWrapper>
    </form>
  );
};

export { RegistrationConfirm };
