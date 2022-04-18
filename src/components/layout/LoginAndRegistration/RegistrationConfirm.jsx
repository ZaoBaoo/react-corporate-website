import { useEffect } from "react";
import { TitleLogin } from "../../TitleLogin";
import { ModalAndWrapper } from "./ModalAndWrapper";
import { InputLogin } from "../../InputLogin";

// Store
import { useSelector } from "react-redux";
import { ButtonLogin } from "../../ButtonLogin/ButtonLogin";
import { TextLogin } from "../../TextLogin";

const RegistrationConfirm = () => {
  // Selectrot
  const { firstName, lastName, email, phoneNumber } = useSelector(
    (state) => state.registration
  );

  // TEST
  useEffect(() => {
    console.log("last");
  });
  return (
    <form action="">
      <ModalAndWrapper>
        <TitleLogin title="Потвердите данные" />
        <InputLogin mode="inputLine" label={firstName} type="text" disabled />
        <InputLogin mode="inputLine" label={lastName} type="text" disabled />
        <InputLogin mode="inputLine" label={email} type="text" disabled />
        <InputLogin mode="inputLine" label={phoneNumber} type="text" disabled />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {/* <Link to="/registrationtwo">
            <ButtonLogin mode="registration" name="НАЗАД" />
          </Link> */}
        </div>
        <TextLogin linkedText="изменить данные" linkedTo="/registrationthree" />
        <br />
        <ButtonLogin mode="registration" name="ЗАРЕГИСТРИРОВАТЬСЯ" />
      </ModalAndWrapper>
    </form>
  );
};

export default RegistrationConfirm;
