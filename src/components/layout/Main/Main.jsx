// Firebase
import { auth } from "../../../firebase";

// ID
import { v4 as idGenerator } from "uuid";

// Store
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../../store/slice/loginSlice";
import { userDBAction } from "../../../store/slice/userDBSlice";

const Main = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userDB);

  // (f) LogOut
  const LogOut = () => {
    auth.signOut();
    dispatch(loginAction.loginHandler(false));
    dispatch(userDBAction.clearUserData());
    console.log("Вышли");
  };
  return (
    <>
      {userData &&
        Object.values(userData).map((item) => (
          <p key={idGenerator()}>{item}</p>
        ))}
      <h1>MAIN</h1>
      <button onClick={LogOut}>LogOut</button>
    </>
  );
};

export { Main };
