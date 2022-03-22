import React from "react";
import ButtonLogin from "./ButtonLogin";
import RegistrationTitle from "./RegistrationTitle";

function Registration1(props) {
  return (
    <div className="login">
      <RegistrationTitle text={"-- Шаг 1 / 3 --"} />

      <input className="validate" type="text" placeholder="Имя" />

      <input className="validate" type="text" placeholder="Фамилия" />

      <div className="btn-wrapper">
        <ButtonLogin
          title={"Назад"}
          icon={"arrow_back"}
          position={"left"}
          link="/"
        />
        <ButtonLogin
          title={"Далее"}
          icon={"arrow_forward"}
          position={"right"}
          link="/registration2"
        />
      </div>
    </div>
  );
}

export default Registration1;
