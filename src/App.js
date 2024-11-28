import { Routes, Route, HashRouter } from "react-router-dom";
import UserLayout from "./layout";
import HomePage from "./pages/HomePage";
import DescriptionPage from "./pages/DescriptionPage";
import FinacialPage from "./pages/FinacialPage";
import AboutUs from "./pages/AboutUsPage";
import DeleteSubscriber from "./components/DeleteSubscriber";
import ContactUS from "./pages/ContactUsPage";
import PrivacyPolicy from "./pages/legal/PrivacyPolicyPage";
import TermsAndCondition from "./pages/legal/TermsAndConditionPage";
import Reviews from "./pages/ReviewsPage";
import Sidebar from "./components/SideBar";
import AppointmentIFrames5 from "./components/AppointmentIFrames5";
import AppointmentIFrames30 from "./components/AppointmentIFrames30";
import GetCarLoan from "./components/GetCarLoan";
import AdminPanel from "./components/admin/AdminPanel";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          {/* <Route index element={<HomePage />} /> */}
          <Route index element={<Sidebar />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUS />} />
          <Route path="/finance" element={<FinacialPage />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsandconditions" element={<TermsAndCondition />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/inventory" element={<Sidebar />} />
          <Route path="/five-minutes-appointment" element={<AppointmentIFrames5 />} />
          <Route path="/get-car-loan" element={<GetCarLoan />} />
          <Route path="/physical-appointment" element={<AppointmentIFrames30 />} />
          <Route path="/vehicle/:vehicleId" element={<DescriptionPage />} />
          <Route path="/subscriber/:id" element={<DeleteSubscriber />} />
        </Route>
        <Route path="/admin/secret/mka" element={<AdminPanel />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
