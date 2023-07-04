import React from "react";
import { Container } from "react-bootstrap";
import Banner from "./components/Banner";
import HowItWorks from "./components/HowItWorks";
import AboutUs from "./components/AboutUs";
import TechnologyArea from "./components/TechnologyArea";
import MissionAndVision from "./components/MissionAndVision";
import Benefits from "./components/Benefits";
import CustomNavbar from "../../Common/CustomNavbar/Index";
import CustomFooter from "../../Shared/Footer/CustomFooter";
import "../../Stylesheet/Homepage/homePage.scss";
import BrowesByCatogories from "./components/BrowesByCatogories";
import TopSkills from "./components/TopSkills";

const Homepage = () => {
  return (
    <>
      <CustomNavbar />

      <Container>
        <Banner />
        {/* <HowItWorks /> */}
        {/* <AboutUs /> */}
        <BrowesByCatogories />
        
        <TechnologyArea />
        <TopSkills />
        <MissionAndVision />
        <Benefits />
      </Container>

      <CustomFooter />
    </>
  );
};

export default Homepage;
