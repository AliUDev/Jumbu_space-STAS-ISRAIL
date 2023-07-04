import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Menu, Dropdown } from "antd";
import { AiOutlineMenu, AiFillCaretDown } from "react-icons/ai";
import logo from "../../assets/logo.png";
import CustomButton from "../../Common/Button/CustomButton";
import { BASE_URL } from "../../utils/contants";

const menu = [
  {
    key: "home",
    label: "Home",
    path: "/",
    isPrivateRoute: false,
    allow: ["customer", "seller"],
  },
  {
    key: "",
    label: "",
    path: "/pages/",
    isPrivateRoute: true,
    allow: ["customer", "seller"],
  },
  {
    key: "orders",
    label: "Orders",
    path: "/pages/orders",
    isPrivateRoute: true,
    allow: ["customer", "seller"],
  },
  {
    key: "jobs",
    label: "Jobs",
    path: "/jobs",
    isForBoth: true,
    allow: ["seller"],
  },
  {
    key: "post-job",
    label: "Post Job",
    path: "/pages/post-job",
    isPrivateRoute: true,
    allow: ["customer"],
  },
  {
    key: "profile",
    label: "Profile",
    path: "/pages/profile",
    isPrivateRoute: true,
    allow: ["customer", "seller"],
  },
  {
    key: "chat",
    label: "Chat",
    path: "/pages/chat",
    isPrivateRoute: true,
    allow: ["customer", "seller"],
  },
  {
    key: "gigs",
    label: "Gigs",
    path: "/pages/gigs",
    isPrivateRoute: true,
    allow: ["seller"],
  },
  {
    key: "view_gigs",
    label: "View Gigs",
    path: "/gigs",
    isPrivateRoute: true,
    allow: ["customer"],
  },
];

const CustomNavbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("authUser"));
  const userType = localStorage.getItem("userType");
  const isLoggedIn = localStorage.getItem("authUser");
  const [showNavbar, setShowNavbar] = useState(false);

  let filteredMenu = isLoggedIn
    ? menu.filter((item) => item.isPrivateRoute || item.isForBoth)
    : menu.filter((item) => !item.isPrivateRoute || item.isForBoth);

  filteredMenu = filteredMenu.filter((item) => item.allow.includes(userType));

  const handleClick = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <>
      {showNavbar ? (
        <Container
          fluid
          style={{
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            zIndex: "20",
            background: "white",
          }}
          
        >
          <Row className="py-3 border-bottom align-items-center">
            <Col className="d-flex align-items-center justify-content-start">
              <div className="hamburger me-4">
                <AiOutlineMenu onClick={handleClick} />
              </div>
              <img src={logo} alt="" />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="d-flex flex-column cont-nav-items pt-3 pb-5">
                {filteredMenu.map((item) => (
                  <Link
                    key={item.key}
                    className="my-2 py-2 navbar-items"
                    to={item.path}
                  >
                    <h6 className="mb-0 font-primary navbar-items">
                      {item.label}
                    </h6>
                  </Link>
                ))}
              </div>

              {!isLoggedIn && (
                <>
                  <CustomButton
                    block
                    classes="my-2"
                    type="secondary"
                    values="Login"
                    variant="outlined"
                    onClick={() => navigate("/login")}
                  />
                  <CustomButton
                    block
                    classes="my-2"
                    type="primary"
                    values="Signup"
                    onClick={() => navigate("/signup")}
                  />
                </>
              )}
            </Col>
          </Row>
        </Container>
      ) : (
        <Container fluid className="border-bottom bg-white container-navbar">
          <Container>
            <Row className="py-3">
              <Col
                xs={12}
                sm={4}
                md={3}
                lg={3}
                className="d-flex align-items-center justify-content-start"
              >
                <div className="d-block d-sm-block d-md-block d-lg-none hamburger me-4">
                  <AiOutlineMenu onClick={handleClick} />
                </div>
                <img className="logo-img" src={logo} alt="" />
              </Col>

              <Col
                xs={12}
                sm={8}
                md={9}
                lg={9}
                className="d-flex align-items-center justify-content-end justify-content-lg-between"
              >
                <div className="d-none d-lg-flex cont-nav-items align-items-center justify-content-lg-between">
                  {filteredMenu.map((item) => (
                    <Link
                      key={item.key}
                      className="mb-0 mx-4 font-primary navbar-items"
                      to={item.path}
                    >
                      <h6 className="mb-0 font-primary navbar-items">
                        {item.label}
                      </h6>
                    </Link>
                  ))}
                </div>
                {isLoggedIn ? (
                  <div className="d-none d-md-flex justify-content-between">
                    <img
                      className="sidebarUserImg me-2"
                      src={BASE_URL + user?.image?.url}
                      alt="User"
                    />
                    <div className="d-flex align-items-start justify-content-center flex-column">
                      <p className="m-0">{user?.fullName}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="m-0 me-2">{user?.email}</p>
                        <Dropdown
                          overlay={
                            <Menu
                              onClick={() => {
                                localStorage.removeItem("authUser");
                                navigate("/login");
                              }}
                            >
                              <Menu.Item key="1">Logout</Menu.Item>
                            </Menu>
                          }
                        >
                          <AiFillCaretDown />
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="d-flex auth-buttons"
                    style={{ maxWidth: "300px" }}
                  >
                    <CustomButton
                      block
                      classes="mx-2"
                      type="secondary"
                      values="Login"
                      variant="outlined"
                      onClick={() => navigate("/login")}
                    />
                    <CustomButton
                      block
                      classes="mx-2"
                      type="primary"
                      values="Signup"
                      onClick={() => navigate("/signup")}
                    />
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </Container>
      )}
    </>
  );
};

export default CustomNavbar;
