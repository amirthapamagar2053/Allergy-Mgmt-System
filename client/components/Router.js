import { Routes, Route } from "react-router-dom";
import AllergyDetails from "./AllergyDetails";
import AllergyForm from "./AllergyForm";
import AllergyList from "./AllergyList";
import ContactUs from "./ContactUs";
import EditAllergyForm from "./EditAllergyForm";
// import Allergies from "./Allergies";
import SignInSide from "./Login";
import MenuAppBar from "./MenuAppBar";
import OverView from "./OverView";
import SignUp from "./Signup";

const Router = () => (
  <Routes>
    <Route path="/" element={<SignInSide />} />
    <Route path="/Signup" element={<SignUp />} />
    {/* <Route path="/Allergies" element={<Allergies />} /> */}
    <Route path="/Allergies" element={<MenuAppBar />} />
    <Route path="/OverView" element={<OverView />} />
    <Route path="/AllergyList" element={<AllergyList />} />
    <Route path="/ContactUs" element={<ContactUs />} />
    <Route path="/AllergyForm" element={<AllergyForm />} />
    <Route path="/AllergyLists/:id" element={<AllergyDetails />} />
    <Route path="/AllergyLists/edit/:id" element={<EditAllergyForm />} />
  </Routes>
);

export default Router;
