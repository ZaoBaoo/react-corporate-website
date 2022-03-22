import React from "react";
import { Link } from "react-router-dom";

function ButtonLogin(props) {
  const { title = "", link = "", func, icon, position = "right" } = props;
  return (
    <Link
      to={link}
      className="btn-small"
      type="submit"
      name="action"
      onClick={func || null}
    >
      <span>{title}</span>
      {icon ? <i className={`material-icons ${position}`}>{icon}</i> : null}
    </Link>
  );
}
// deep-purple lighten-1

export default ButtonLogin;
