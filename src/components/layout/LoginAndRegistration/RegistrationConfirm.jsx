import { useEffect } from "react";

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

  // (f) Регистрация
  const signUpHandler = (e) => {
    e.preventDefault();
    const dataForSignUp = { firstName, lastName, email, phoneNumber, password };
    //
    dispatch(registrationByEmailThunk(dataForSignUp));
  };

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
        />
      </ModalAndWrapper>
    </form>
  );
};

export { RegistrationConfirm };
