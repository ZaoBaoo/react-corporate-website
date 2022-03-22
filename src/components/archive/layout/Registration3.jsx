import { useState } from "react";
import ButtonLogin from "./ButtonLogin";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import RegistrationTitle from "./RegistrationTitle";

function Registration3() {
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <RegistrationTitle text={"-- Шаг 3 / 3 --"} />

      <input className="validate" type="password" placeholder="Пароль" />

      <input
        className="validate"
        type="password"
        placeholder="Повторите пароль"
      />

      <div className="btn-wrapper">
        <ButtonLogin
          title={"Назад"}
          icon={"arrow_back"}
          position={"left"}
          link="/registration2"
        />
        <ButtonLogin
          title={"Далее"}
          icon={"arrow_forward"}
          position={"right"}
        />
      </div>
    </div>
  );
}

export default Registration3;
