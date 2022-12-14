import { Routes, Route } from "react-router-dom";
import Allergies from "./Allergies";
import SignInSide from "./Login";
import SignUp from "./Signup";

const Router = () => (
  <Routes>
    <Route path="/" element={<SignInSide />} />
    <Route path="/Signup" element={<SignUp />} />
    <Route path="/Allergies" element={<Allergies />} />
  </Routes>
);

export default Router;
