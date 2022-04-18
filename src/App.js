import { Routes, Route } from "react-router-dom";

import { Main } from "./components/layout/Main/Main";
import {
  Login,
  RegistrationOne,
  RegistrationTwo,
  RegistrationThree,
} from "./components/layout/LoginAndRegistration";
import { Erorr } from "./components/Erorr";
import RegistrationConfirm from "./components/layout/LoginAndRegistration/RegistrationConfirm";

//

//

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrationone" element={<RegistrationOne />} />
        <Route path="/registrationtwo" element={<RegistrationTwo />} />
        <Route path="/registrationthree" element={<RegistrationThree />} />
        <Route path="/registrationconfirm" element={<RegistrationConfirm />} />
        <Route path="*" element={<Erorr />} />
      </Routes>
    </div>
  );
}

export default App;
