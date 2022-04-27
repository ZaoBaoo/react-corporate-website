import { auth } from "../../../firebase";

const Main = () => {
  return (
    <>
      <h1>MAIN</h1>
      <button onClick={() => auth.signOut()}>LogOut</button>
    </>
  );
};

export { Main };
