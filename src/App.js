import { Routes, Route, Link } from "react-router-dom";

import { Login } from "./components/layout/Login";

// import Registration1 from "./components/Registration1";
// import Registration2 from "./components/Registration2";
// import Registration3 from "./components/Registration3";
// import Test from "./components/archive/layout/TestComponent/Test";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" element={<Login />} />
        <Route path="registration1" element={<Registration1 />} />
        <Route path="registration2" element={<Registration2 />} />
        <Route path="registration3" element={<Registration3 />} />
        <Route path="test" element={<Test />} />
        <Route path="*" element={<h1> Не найдено </h1>} /> */}
      </Routes>
    </div>
  );
}

export default App;
