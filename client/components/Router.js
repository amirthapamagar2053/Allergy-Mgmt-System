import { Routes, Route } from "react-router-dom";
import SignInSide from "./Login";
import SignUp from "./Signup";

const Router = () => (
  <Routes>
    <Route path="/" element={<SignInSide />} />
    <Route path="/Signup" element={<SignUp />} />
  </Routes>
);

export default Router;
