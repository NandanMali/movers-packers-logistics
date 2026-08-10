import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer/footer.js";
import Navbar from "./components/Navbar/navbar.js";
import Topbar from "./components/Topbar/topbar.js";
import HomePage from "./Pages/Home/homePage.js";
import AboutPage from "./Pages/AboutPage/aboutPage.js";
import ServicePage from "./Pages/ServicePage/servicePage.js";
import ContactPage from "./Pages/Contact/contactPage.js";
import VerifyOTP from "./Pages/VerifyOTP/verifyOTP.js";
import AdminLayout from "./Layouts/AdminLayout/AdminLayout.jsx";
import Dashboard from "./Panel/AdminPanel/Dashboard/Dashboard.jsx";
import Users from "./Panel/AdminPanel/Users.jsx";
import Partners from "./Panel/AdminPanel/PartnerPage/Partners.jsx";
import PartnerDashboard from "./Panel/TransportPartnerPanel/Dashboard.jsx";
import UserLayout from "./Layouts/UserLayout/UserLayout.jsx";
import PartnerLayout from "./Layouts/PartnerLayout/PartnerLayout.jsx";
import AdminCategories from "./Panel/AdminPanel/Categories.jsx";
import Logout from "./components/Logout/Logout.js";
import Auth from "./components/Auth/Auth.js";
import RegisterPage from "./Pages/Registerpage/Registerpage.js";
import LoginPage from "./Pages/Loginpage/Loginpage.js";
import UserDashboard from "./Panel/UserPanel/Dashboard.jsx";
import AdminProfile from "./Panel/AdminPanel/Profile.jsx";
import AdminSubCategories from "./Panel/AdminPanel/SubCategory.jsx";
import UserProfile from "./Panel/UserPanel/Profile.jsx";
import AdminSettings from "./Panel/AdminPanel/Settings.jsx";
import UserSettings from "./Panel/UserPanel/Settings.jsx";
import PartnerProfile from "./Panel/TransportPartnerPanel/Profile.jsx";
import PartnerSettings from "./Panel/TransportPartnerPanel/Settings.jsx";
import ChatBot from "./components/ChatBot/ChatBot.jsx";
import { useEffect } from "react";
import Payments from "./Panel/AdminPanel/Payments.jsx";
import Tracking from "./Panel/AdminPanel/Tracking.jsx";
import Support from "./Panel/AdminPanel/Support.jsx";
import CreateBooking from "./Panel/UserPanel/Booking/CreateBooking.jsx";
import PartnerVehicles from "./Panel/TransportPartnerPanel/Vehicles/Vehicles.jsx";
import PartnerDrivers from "./Panel/TransportPartnerPanel/Driver/Drivers.jsx";
import CompleteProfile from "./Panel/TransportPartnerPanel/CompleteProfile/CompleteProfile.jsx";
import QuoteRequests from "./Panel/TransportPartnerPanel/QuoteRequests/QuoteRequests.jsx";
import MyBookings from "./Panel/UserPanel/MyBookings/MyBookings.jsx";
import AssignedJobs from "./Panel/TransportPartnerPanel/AssignedJobs/AssignedJobs.jsx";
import MyOrders from "./Panel/TransportPartnerPanel/MyOrders/MyOrders.jsx";
import QuoteStatus from "./Panel/TransportPartnerPanel/QuotesStatus/QuoteStatus.jsx";
import AdminBookings from "./Panel/AdminPanel/Bookings/Bookings.jsx";
import PaymentSuccess from "./Panel/UserPanel/Payment/Success/PaymentSuccess.jsx";
import Cancel from "./Panel/UserPanel/Payment/Extra/cancel.jsx";
import UserPayments from "./Panel/UserPanel/Payments/Payments.jsx";
import AdminPayments from "./Panel/AdminPanel/Payments/Payments.jsx";
import PartnerPayments from "./Panel/TransportPartnerPanel/Payments/Payments.jsx";
import AdminDrivers from "./Panel/AdminPanel/PartnerPage/Driver/Drivers.jsx";
import AdminVehicles from "./Panel/AdminPanel/PartnerPage/Vehicles/Vehicles.jsx";
import BookingPayment from "./Panel/UserPanel/Payment/Payment.jsx";
// import PartnerDrivers from "./Panel/TransportPartnerPanel/DriversAd/Drivers.jsx";

function App() {
  const location = useLocation();

  const isDashboard =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/user") ||
    location.pathname.startsWith("/partner");

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 50);
  }, [location.pathname]);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <Auth />

      {!isDashboard && <Topbar />}

      {!isDashboard && <Navbar />}

      <Routes>
        {/* Public Routes */}

        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* Admin Routes */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories" element={<AdminCategories />}></Route>
          <Route
            path="categories/subcategories/:catName"
            element={<AdminSubCategories />}
          />
          <Route path="users" element={<Users />} />
          <Route path="partners" element={<Partners />} />
          <Route
            path="partners/drivers/:id"
            element={<AdminDrivers />}
          />
          <Route
            path="partners/vehicles/:id"
            element={<AdminVehicles />}
          />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="support" element={<Support />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* User Routes */}

        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="booking" element={<CreateBooking />} />
          <Route path="mybookings" element={<MyBookings />} />
          <Route path="mybookings/payment/:quoteId/:bookingId" element={<BookingPayment />} />
          <Route path="payment" element={<UserPayments />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="payment-cancel" element={<Cancel />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>
        
        <Route path="/partner" element={<PartnerLayout />}>
         <Route index element={<PartnerDashboard />} />
          <Route path="dashboard" element={<PartnerDashboard />} />
          <Route path="jobs" element={<AssignedJobs />} />
          <Route path="vehicles" element={<PartnerVehicles />} />
          <Route path="drivers" element={<PartnerDrivers />} />
          <Route path="myorders" element={<MyOrders />} />
          <Route path="earning" element={<PartnerPayments />} />
          <Route path="completeprofile" element={<CompleteProfile />} />
          <Route path="quoterequests" element={<QuoteRequests />} />
          <Route path="quotestatus" element={<QuoteStatus />} />
          <Route path="profile" element={<PartnerProfile />} />
          <Route path="settings" element={<PartnerSettings />} />
          {/* <Route path="bookings" element={<AssignedBookings />} /> */}
        </Route>
      </Routes>

      {!isDashboard && <Footer />}
      <ChatBot />
      {/* <!-- Back to Top --> */}
      {!isDashboard && (
        <button
          onClick={scrollUp}
          className="btn btn-lg btn-primary btn-lg-square back-to-top" style={{marginBottom:"50px"}}
        >
          <i className="bi bi-arrow-up"></i>
        </button>
      )}
    </>
  );
}

export default App;
