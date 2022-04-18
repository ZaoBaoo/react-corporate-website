import { Navigate } from "react-router-dom";

const lock = false;

const Main = () => {
  // return <div>MAIN</div>;
  return <>{lock ? <h1>Main</h1> : <Navigate to="/login" />}</>;
};

export { Main };
