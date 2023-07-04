import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Button } from "antd";
import HomeBanner from "../../../assets/home-banner.jpg";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <Row className="home-banner">
      <Col sm={6} md={7} className="p-3 left-column">
        <h2 className="mb-3">Hire On-Demand Engineers & Freelancers.</h2>
        <h4 className="color-blue mb-2 ">
          A Network, Cloud Computing, DevOps & Automation Engineering Platform
        </h4>
        {/* <p className="color-blue">
          Security is at the base of every Technology
        </p>
        <p className="color-blue">All Participants are Strongly Vetted.</p> */}
        <div>
          <Button
            type="primary"
            className="banner-btn"
            onClick={() => navigate("/pages/post-job")}
          >
            Post A Job For Free
          </Button>
          <Button
            type="primary"
            className="banner-btn mt-3"
            onClick={() => navigate("/jobs")}
          >
            Find Work
          </Button>
        </div>
      </Col>
      <Col
        sm={6}
        md={5}
        
        className="p-3 d-flex flex-column justify-content-center "
      >
        <img src={HomeBanner} className="home-banner-img" alt="Banner" />
      </Col>
    </Row>
  );
};

export default Banner;
