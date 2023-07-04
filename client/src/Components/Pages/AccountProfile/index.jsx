import React from "react";
import { Container } from "react-bootstrap";
import UserProfile from "./components/UserProfile";
// import Jobs from "./components/Jobs";
import Reviews from "./components/Reviews";
import "../../Stylesheet/Profile/profile.scss";
import CustomNavbar from "../../Common/CustomNavbar/Index";
import CustomFooter from "../../Shared/Footer/CustomFooter";

const AccountProfile = () => {
  return (
    <>
      <CustomNavbar />
      <Container className="profile-page mb-4 container-2">
        <UserProfile />
      </Container>

      <CustomFooter />
    </>
  );
};

export default AccountProfile;
