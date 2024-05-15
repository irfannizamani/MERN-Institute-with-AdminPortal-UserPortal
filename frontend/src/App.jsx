import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeaderAdmin from "./components/admin/HeaderAdmin";
import FooterAdmin from "./components/admin/FooterAdmin";
import Home from "./components/Home";
import About from "./components/About";
import Courses from "./components/Courses";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Career from "./components/Career";
import LoginAdmin from "./components/admin/LoginAdmin";
import ServicesAdmin from "./components/admin/ServicesAdmin";
import NotFound from "./components/NotFound";
import HomeAdmin from "./components/admin/HomeAdmin";
import ServicesEditAdmin from "./components/admin/ServicesEditAdmin";
import CoursesAdmin from "./components/admin/CoursesAdmin";
import CarouselsAdmin from "./components/admin/CarouselsAdmin";
import CareerAdmin from "./components/admin/CareerAdmin";
import ContactAdmin from "./components/admin/ContactAdmin";
import UpdatesAdmin from "./components/admin/UpdatesAdmin";
import HeaderUser from "./components/users/HeaderUser";
import FooterUser from "./components/users/FooterUser";
import LoginUser from "./components/users/LoginUser";
import HomeUser from "./components/users/HomeUser";
import RegisterUser from "./components/users/RegisterUser";
import UpdatesUser from "./components/users/UpdatesUser";
import FeedbackUser from "./components/users/FeedbackUser";
import FeedbackAdmin from "./components/admin/FeedbackAdmin";
import ForgetPasswordUser from "./components/users/ForgotPasswordUser";
import OtpCodeUser from "./components/users/OtpCodeUser";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Header /><Home /><Footer /></>} />
        <Route path="/about" element={<><Header /><About /><Footer /></>} />
        <Route path="/courses" element={<><Header /><Courses /><Footer /></>} />
        <Route path="/services" element={<><Header /><Services /><Footer /></>} />
        <Route path="/career" element={<><Header /><Career /><Footer /></>} />
        <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />

        
  
        <Route path="/admin" element={<><LoginAdmin /><FooterAdmin /></>} />
        <Route path="/admin/home" element={<><HeaderAdmin /><HomeAdmin /><FooterAdmin /></>} />
        <Route path="/admin/services" element={<><HeaderAdmin /><ServicesAdmin /><FooterAdmin /></>} />
        <Route path="/admin/editservices/:id" element={<><HeaderAdmin /><ServicesEditAdmin /><FooterAdmin /></>} />
        <Route path="/admin/courses" element={<><HeaderAdmin /><CoursesAdmin /><FooterAdmin /></>} />
        <Route path="/admin/carousels" element={<><HeaderAdmin /><CarouselsAdmin /><FooterAdmin /></>} />
        <Route path="/admin/career" element={<><HeaderAdmin /><CareerAdmin /><FooterAdmin /></>} />
        <Route path="/admin/contact" element={<><HeaderAdmin />   <ContactAdmin/>    <FooterAdmin /></>} />

        <Route path="/admin/updates" element={<><HeaderAdmin />   <UpdatesAdmin/>    <FooterAdmin /></>} />

        <Route path="/admin/feedback" element={<><HeaderAdmin />   <FeedbackAdmin/>  <FooterAdmin /></>} />



{/*   User  Portal     */}

<Route path="/user" element={<>  <LoginUser/> <FooterUser/> </>} />

<Route path="/user/register" element={<>  <RegisterUser/> <FooterUser/> </>} />
<Route path="/user/home" element={<><HeaderUser /> <HomeUser/>  <FooterUser /></>} />
<Route path="/user/updates" element={<><HeaderUser /> <UpdatesUser/>  <FooterUser /></>} />

<Route path="/user/feedback" element={<><HeaderUser /> <FeedbackUser/>  <FooterUser /></>} />

<Route path="/user/forgetpass" element={<><ForgetPasswordUser/> <FooterUser /></>} />

<Route path="/user/otpcode" element={<> <OtpCodeUser/>  <FooterUser /></>} />

       <Route path="*" element={<><Header /><NotFound /><Footer /></>} /> 

      </Routes>
    </Router>
  );
}

export default App;