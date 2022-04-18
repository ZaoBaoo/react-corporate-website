import { useForm } from "react-hook-form";

import { ModalAndWrapper } from "./ModalAndWrapper";
import { InputLogin } from "../../InputLogin";
import { TitleLogin } from "../../TitleLogin";
import { TextLogin } from "../../TextLogin";
import { ButtonLogin } from "../../ButtonLogin/ButtonLogin";

import { emailVal, passVal } from "./Validate";

const Login = () => {
  // HOOK USE FORM
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onSubmit" });

  // (f)
  const handlerLogin = (data) => {
    const { emailLogin, passwordLogin } = data;
    // АВТОРИЗАЦИЯ
  };

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
        />
        <TextLogin
          text="Нет учетной записи?"
          linkedText=" Создать."
          linkedTo="/registrationone"
        />
        <ButtonLogin mode="login" name="Войти" type="submit" />
      </ModalAndWrapper>
    </form>
  );
};

export { Login };
