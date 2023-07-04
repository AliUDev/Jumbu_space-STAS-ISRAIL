import React from "react";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./Components/Common/PrivateRoute";
import LoginPage from "./Components/User/Login/Login";
import SignUpPage from "./Components/User/Signup/Signup";
import HomePage from "./Components/Pages/Homepage";
import Chat from "./Components/Pages/Chat";
import AccountProfile from "./Components/Pages/AccountProfile";
import PostJob from "./Components/Pages/PostJob";
import DashboardPage from "./Components/Pages/Dashboard";
import JobsPage from "./Components/Pages/Jobs";
import Gigs from "./Components/Pages/Gig/Gigs";
import CreateGigs from "./Components/Pages/Gig/CreateGigs";
import ViewGig from "./Components/Pages/Gig/ViewGig";
import ViewGigs from "./Components/Pages/Gig/ViewGigs";
import UserDetailPage from "./Components/Pages/UserDetails";
import Orders from "./Components/Pages/Orders/Orders";
import PlaceOrder from "./Components/Pages/Orders/PlaceOrder";
import Success from "./Components/Pages/PaymentStatus/Success";
import Cancel from "./Components/Pages/PaymentStatus/Cancel";
import JobDetails from "./Components/Pages/Jobs/components/JobDetails";
import "./App.scss";
import JobProposal from "./Components/Pages/Jobs/components/JobProposal";
import AdminPanalHome from "./Components/Pages/Admin/AdminPanalHome";
function App() {
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
      />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/details" element={<JobDetails />} />
          <Route path="/job/submitproposal" element={<JobProposal/>} />
          <Route path="/gigs" element={<ViewGigs />} />
          <Route path="/gigs/:id" element={<ViewGig />} />
          <Route path="/user-detail/:userID" element={<UserDetailPage />} />
          <Route path="/pages" element={<PrivateRoute />} />
          <Route path="/pages/chat" element={<Chat />} />
          <Route path="/pages/gigs" element={<Gigs />} />
          <Route path="/payment/success" element={<Success />} />
          <Route path="/payment/cancel" element={<Cancel />} />
          <Route path="/pages/creategigs" element={<CreateGigs />} />
          <Route path="/pages/profile" element={<AccountProfile />} />
          <Route path="/pages/post-job" element={<PostJob />} />
          <Route path="/pages/orders" element={<Orders />} />
          <Route path="/pages/place-order" element={<PlaceOrder />} />
          <Route path="/pages/dashboard" element={<DashboardPage />} />


          <Route path="/admin/home" element={<AdminPanalHome/>}  />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
