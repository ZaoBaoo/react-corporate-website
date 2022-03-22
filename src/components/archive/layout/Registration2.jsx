import React from "react";
import ButtonLogin from "./ButtonLogin";
import RegistrationTitle from "./RegistrationTitle";

function Registration2(props) {
  return (
    <div className="login">
      <RegistrationTitle text={"-- Шаг 2 / 3 --"} />

      <input className="validate" type="email" placeholder="E-mail" />

      <input className="validate" type="tel" placeholder="Номер телефона" />

      <div className="btn-wrapper">
        <ButtonLogin
          title={"Назад"}
          icon={"arrow_back"}
          position={"left"}
          link="/registration1"
        />
        <ButtonLogin
          title={"Далее"}
          icon={"arrow_forward"}
          position={"right"}
          link="/registration3"
        />
      </div>
    </div>
  );
}

export default Registration2;
