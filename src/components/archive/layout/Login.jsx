import React from "react";
import { Link } from "react-router-dom";
import ButtonLogin from "../ButtonLogin";

function Login() {
  return (
    <div className="login">
      <span className="version">alpha v0.0001</span>
      <h4 className="login__title">Корпоративная сеть</h4>

      {/* Login */}
      {/* <div className="login__group">
        <i className="material-icons left medium">account_circle</i>
        <a className="waves-effect waves-light btn indigo accent-1">Войти</a>
      </div> */}

      {/* Registration */}
      {/* <div className="login__group">
        <i className="material-icons left medium">group_add</i>
        <Link to="registration1" className="waves-effect waves-light btn">
          Регистрация
        </Link>
      </div> */}

      <div className="login__group">
        <i className="material-icons left medium">account_circle</i>
        <ButtonLogin title={"Логин"} link="" />
      </div>

      <div className="login__group">
        <i className="material-icons left medium">group_add</i>
        <ButtonLogin title={"Регистрация"} link="/registration1" />
      </div>
    </div>
  );
}

export default Login;
