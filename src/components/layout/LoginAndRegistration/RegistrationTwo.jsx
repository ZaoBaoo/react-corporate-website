import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// Store
import { useDispatch, useSelector } from "react-redux";
import { registrationAction } from "../../../store/slice/registrationSlice";
// Parse Number
import { parsePhoneNumberFromString } from "libphonenumber-js";

// Components
import { ButtonLogin } from "../../ButtonLogin/ButtonLogin";
import { InputLogin } from "../../InputLogin";
import { TextLogin } from "../../TextLogin";
import { ModalAndWrapper } from "./ModalAndWrapper";

import { emailVal, telVal } from "./Validate";

const RegistrationTwo = () => {
  const refButtonNextPage = useRef(null);
  // Navigate
  const next = useNavigate();

  // Selector store
  const { email, phoneNumber } = useSelector((state) => state.registration);

  // HOOK USE FORM
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
    defaultValues: { emailReg: email, telReg: phoneNumber },
  });

  // Dispatch
  const dispatch = useDispatch();

  // (f)
  const saveFormInput = (data) => {
    dispatch(registrationAction.setEmail(data.emailReg));
    dispatch(registrationAction.setPhoneNumber(data.telReg));
  };

  // (f) next page
  const nextStep = (data) => {
    saveFormInput(data);
    next("/registrationthree");
  };

  // (f) MASK
  const normalizePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value, "KZ");

    if (!phoneNumber) {
      return value;
    }

    return phoneNumber.formatInternational();
  };

  return (
    <form action="" onSubmit={handleSubmit(nextStep)}>
      <ModalAndWrapper>
        <TextLogin text="2 / 3" />
        <InputLogin
          register={register}
          errors={errors}
          val={emailVal}
          name="emailReg"
          mode="inputLine"
          label="Почта"
          type="text"
          autoFocus
          refButtonNextPage={refButtonNextPage}
        />

        <InputLogin
          register={register}
          errors={errors}
          val={telVal}
          name="telReg"
          mode="inputLine"
          label="Номер телефона"
          type="tel"
          // MASK number
          onChange={(e) => {
            e.target.value = normalizePhoneNumber(e.target.value);
          }}
          maxLength="15"
          refButtonNextPage={refButtonNextPage}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Link to="/registrationone">
            <ButtonLogin mode="registration" name="НАЗАД" />
          </Link>

          <ButtonLogin
            mode="registration"
            name="ДАЛЕЕ"
            type="submit"
            ref={refButtonNextPage}
          />
        </div>
      </ModalAndWrapper>
    </form>
  );
};

export { RegistrationTwo };
