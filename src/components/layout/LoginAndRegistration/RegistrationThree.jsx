import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// Store
import { useDispatch, useSelector } from "react-redux";
import { registrationAction } from "../../../store/registration-slice/registration-slice";

// Yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Components
import { ButtonLogin } from "../../ButtonLogin/ButtonLogin";
import { InputLogin } from "../../InputLogin";
import { TextLogin } from "../../TextLogin";
import { ModalAndWrapper } from "./ModalAndWrapper";

import { passVal } from "./Validate";

const RegistrationThree = () => {
  // State toggle password | "text" or "password"
  const [showPasswordReg1, setShowPasswordReg1] = useState(false);
  const [showPasswordReg2, setShowPasswordReg2] = useState(false);

  // Navigate
  const next = useNavigate();

  // Selector store
  const { password, passwordConfirm } = useSelector(
    (state) => state.registration
  );

  // Схема yup для для паролей
  const formSchema = Yup.object().shape({
    passwordReg1: Yup.string()
      .required("Необходимо заполнить")
      .min(7, "Длина пароля должна быть не менее 7 символов"),
    passwordReg2: Yup.string()
      .required("Требуется подтверждение пароля")
      .oneOf([Yup.ref("passwordReg1")], "Пароли должны совпадать"),
  });

  // HOOK USE FORM
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(formSchema),
    defaultValues: { passwordReg1: password, passwordReg2: passwordConfirm },
  });

  // Dispatch
  const dispatch = useDispatch();

  // (f)
  const saveFormInput = (data) => {
    dispatch(registrationAction.setPassword(data.passwordReg1));
    dispatch(registrationAction.setPasswordConfirm(data.passwordReg2));
  };

  // (f) next page
  const nextStep = (data) => {
    saveFormInput(data);
    next("/registrationconfirm");
  };

  return (
    <form action="" onSubmit={handleSubmit(nextStep)}>
      <ModalAndWrapper>
        <TextLogin text="3 / 3" />

        <InputLogin
          register={register}
          errors={errors}
          val={passVal}
          name="passwordReg1"
          mode="inputLine"
          label="Пароль"
          type={showPasswordReg1 ? "text" : "password"}
          iconEyeToggle={setShowPasswordReg1}
        />

        <InputLogin
          register={register}
          errors={errors}
          val={passVal}
          name="passwordReg2"
          mode="inputLine"
          label="Повторите пароль"
          type={showPasswordReg2 ? "text" : "password"}
          iconEyeToggle={setShowPasswordReg2}
        />

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Link to="/registrationtwo">
            <ButtonLogin mode="registration" name="НАЗАД" />
          </Link>

          <ButtonLogin mode="registration" name="ДАЛЕЕ" type="submit" />
        </div>
      </ModalAndWrapper>
    </form>
  );
};

export { RegistrationThree };
