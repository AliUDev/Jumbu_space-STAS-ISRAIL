import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaKey } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { Input, Radio } from "antd";
import { toast } from "react-toastify";
import CustomButton from "../../Common/Button/CustomButton";
import Navbar from "../../Common/CustomNavbar/Index";
import { API_URL } from "../../utils/contants";
import "../../Stylesheet/Login/login.page.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    type: "customer",
  });

  const handleSubmit = () => {
    // Check Validation
    const emptyFields = Object.keys(formData).filter((key) => !formData[key]);
    const anyInvalidField = emptyFields.length > 0 ? true : false;
    if (anyInvalidField) toast.error(`${emptyFields[0]} is required`);

    console.log(formData);

    if (!anyInvalidField) {
      axios
        .post(API_URL + "auth/login", formData)
        .then((res) => {
          localStorage.setItem("authUser", JSON.stringify(res.data));
          localStorage.setItem("userType", formData.type);
          navigate("/pages/dashboard");
        })
        .catch((err) => toast.error(err.response.data?.message));
    }
  };

  return (
    <>
      <Navbar />

      <Container
        fluid
        className="form-card d-flex align-items-center justify-content-center my-5"
      >
        <Container className=" border rounded pb-5 loginCard">
          <Row className="justify-content-center text-center pb-5">
            <Col className="px-5">
              <div className="form-header py-2 my-3 mt-4">
                <h4>Login to JamboSpace</h4>
              </div>

              <div className="px-4 form-wrapper">
                <Input
                  className="color-grey py-2"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  prefix={<IoMdMail className="me-3 " />}
                />

                <Input
                  type="password"
                  className="color-grey py-2 mt-3"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  prefix={<FaKey className="me-3 " />}
                />

                <Radio.Group
                  className="color-grey py-2 mt-3 d-flex"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <Radio value="customer">Customer</Radio>
                  <Radio value="seller">Seller</Radio>
                </Radio.Group>

                <CustomButton
                  classes="mt-4"
                  values="Login"
                  type="primary"
                  block
                  onClick={handleSubmit}
                />
              </div>
            </Col>
          </Row>

          <Row className="form-footer border-top">
            <Col className="my-4 text-center d-flex flex-column justify-content-center align-items-center">
              <p className="mb-0 account-text d-inline-block">
                Don't have an JambuSpace account?
              </p>
              <Link to="/signup" className="text-decoration-none ">
                <CustomButton
                  classes="mt-4 px-5 w-100"
                  values="Sign Up"
                  type="secondary"
                />
              </Link>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container fluid className="bg-color-primary text-white py-4">
        <Row>
          <Col className="d-flex align-items-center justify-content-center flex-column">
            <p className="mb-2">© 2015 - 2022 JambuSpace® Global Inc.</p>
            <div className="footer-content text-center">
              <p className="mb-0">
                <a className="text-white" href="/">
                  Terms of Service
                </a>
              </p>
              <p className="mb-0">
                <a className="text-white" href="/">
                  Privacy Policy
                </a>
              </p>
              <p className="mb-0">
                <a className="text-white" href="/">
                  Accessibility
                </a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
