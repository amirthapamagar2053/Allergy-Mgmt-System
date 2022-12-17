import { Routes, Route } from "react-router-dom";
import AllergyDetails from "./AllergyDetails";
import AllergyForm from "./AllergyForm";
import AllergyList from "./AllergyList";
import ContactUs from "./ContactUs";
import EditAllergyForm from "./EditAllergyForm";
import SignInSide from "./Login";
import OverView from "./OverView";
import RequireAuth from "./RequireAuth";
import SignUp from "./Signup";

const Router = () => (
  <Routes>
    <Route path="/Signin" element={<SignInSide />} />
    <Route path="/Signup" element={<SignUp />} />
    <Route element={<RequireAuth />}>
      <Route path="/" element={<OverView />} />
      <Route path="/AllergyList" element={<AllergyList />} />
      <Route path="/ContactUs" element={<ContactUs />} />
      <Route path="/AllergyForm" element={<AllergyForm />} />
      <Route path="/AllergyLists/:id" element={<AllergyDetails />} />
      <Route path="/AllergyLists/edit/:id" element={<EditAllergyForm />} />
    </Route>
  </Routes>
);

export default Router;
