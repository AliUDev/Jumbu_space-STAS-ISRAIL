import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import { AiFillFileAdd, AiFillEye } from "react-icons/ai";
import { Alert, Input, Tooltip, Form as ResumeForm } from "antd";
import Chip from "@mui/material/Chip";
import axios from "axios";
import { toast } from "react-toastify";
import { Row, Col, Modal, Button, Form } from "react-bootstrap";
import { capitalize } from "lodash/string";
import { API_URL, BASE_URL } from "../../../utils/contants";

const fabStyle = {
  position: "fixed",
  bottom: 16,
  right: 16,
};

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("authUser"));
  const userType = localStorage.getItem("userType");
  const [loggedInUser, setLoggedInUser] = useState(user);
  const [userSkills, setUserSkills] = useState(user?.skills || []);
  const [userResume, setUserResume] = useState(user?.resume || "");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selectedAttr, setSelectedAttr] = useState({});

  const isSeller = userType === "seller";
  let isResumeUploaded = !!userResume;

  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);
  const toggleSkillModal = () => setIsSkillModalOpen(!isSkillModalOpen);
  const toggleResumeModal = () => setIsResumeModalOpen(!isResumeModalOpen);

  const handleUpdateAttr = (event) => {
    event.preventDefault();
    toggleEditModal();
    let newUser = {
      ...loggedInUser,
      [selectedAttr.attr]: selectedAttr.value,
    };
    let userType = localStorage.getItem("userType");
    setLoggedInUser(newUser);
    axios
      .put(API_URL + `auth/${loggedInUser._id}`, { ...newUser, type: userType })
      .then((res) => toast(res.data.message))
      .catch((err) => console.log(err));
    localStorage.setItem("authUser", JSON.stringify(newUser));
    setSelectedAttr(null);
  };

  const handleUpdateProfilePicture = (event) => {
    if (event.target.files && event.target.files[0]) {
      let userType = localStorage.getItem("userType");
      let payload = new FormData();
      payload.append("fullName", loggedInUser.fullName);
      payload.append("email", loggedInUser.email);
      payload.append("username", loggedInUser.username);
      payload.append("password", loggedInUser.password);
      payload.append("country", loggedInUser.country);
      payload.append("phone", loggedInUser.phone);
      payload.append("type", userType);
      payload.append("image", event.target.files[0]);
      axios
        .put(API_URL + `auth/picture/${loggedInUser._id}`, payload)
        .then((res) => {
          let newUser = {
            ...loggedInUser,
            image: res.data.image,
          };
          toast.success("Profile Picture Updated successfully");
          setLoggedInUser(newUser);
          localStorage.setItem("authUser", JSON.stringify(newUser));
        })
        .catch((err) => console.log(err));
    }
  };

  const handleAddSkill = (values) => {
    toggleSkillModal();
    axios
      .post(API_URL + "auth/seller/skills/add", {
        sellerID: loggedInUser._id,
        ...values,
      })
      .then(({ data }) => {
        setUserSkills([...data.skills]);
        localStorage.setItem(
          "authUser",
          JSON.stringify({
            ...user,
            skills: [...data.skills],
          })
        );
      })
      .catch(() => toast.error("Error adding skill. Try Again !!"));
  };

  const handleAddResume = (values) => {
    toggleResumeModal();
    axios
      .post(API_URL + "auth/seller/resume/add", {
        sellerID: loggedInUser._id,
        ...values,
      })
      .then(() => {
        localStorage.setItem(
          "authUser",
          JSON.stringify({
            ...user,
            resume: values.resume,
          })
        );
        setUserResume(values.resume);
      })
      .catch(() => toast.error("Error updating resume. Try Again !!"));
  };

  return (
    <>
      {/* Modal for Editing Attributes */}
      <Modal show={isEditModalOpen} onHide={toggleEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateAttr}>
            <Form.Group className="mb-3">
              <Form.Label>{capitalize(selectedAttr?.attr)}</Form.Label>
              <Form.Control
                type="text"
                as="input"
                value={selectedAttr?.value}
                placeholder="Edit Attribute"
                onChange={(e) =>
                  setSelectedAttr({
                    ...selectedAttr,
                    value: e.target.value,
                  })
                }
              />
            </Form.Group>
            <div className="py-3">
              <Button variant="success" type="submit">
                Update
              </Button>
              <Button
                style={{ marginLeft: "10px" }}
                variant="secondary"
                onClick={toggleEditModal}
              >
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={isSkillModalOpen} onHide={toggleSkillModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ResumeForm onFinish={handleAddSkill}>
            <ResumeForm.Item
              label="Skill"
              name="skill"
              rules={[
                {
                  required: true,
                  message: "Please input your skill!",
                },
              ]}
            >
              <Input />
            </ResumeForm.Item>
            <div className="py-3">
              <Button variant="success" type="submit">
                Add
              </Button>
              <Button
                style={{ marginLeft: "10px" }}
                variant="secondary"
                onClick={toggleSkillModal}
              >
                Close
              </Button>
            </div>
          </ResumeForm>
        </Modal.Body>
      </Modal>

      <Modal show={isResumeModalOpen} onHide={toggleResumeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Resume</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ResumeForm onFinish={handleAddResume}>
            <ResumeForm.Item
              label="Resume Link"
              name="resume"
              rules={[
                {
                  required: true,
                  message: "Please input your resume link!",
                },
              ]}
            >
              <Input />
            </ResumeForm.Item>
            <div className="py-3">
              <Button variant="success" type="submit">
                Add Resume
              </Button>
              <Button
                style={{ marginLeft: "10px" }}
                variant="secondary"
                onClick={toggleResumeModal}
              >
                Close
              </Button>
            </div>
          </ResumeForm>
        </Modal.Body>
      </Modal>

      {isResumeUploaded ? (
        <a href={userResume} target="_blank" rel="noreferrer">
          <Tooltip placement="left" color="#2db7f5" title="View Resume">
            <Fab color="primary" sx={fabStyle}>
              <AiFillEye size={24} />
            </Fab>
          </Tooltip>
        </a>
      ) : (
        <Tooltip placement="left" color="#2db7f5" title="Upload Resume">
          <Fab color="primary" sx={fabStyle} onClick={toggleResumeModal}>
            <AiFillFileAdd size={24} />
          </Fab>
        </Tooltip>
      )}

      {!isResumeUploaded && (
        <Alert
          message="You have not added your resume yet. It will help your clients to know better about you"
          className="my-3"
          type="info"
          showIcon
          closable
        />
      )}

      {isSeller && userSkills.length === 0 && (
        <Alert
          message="Don't forget to add your skills"
          className="my-3"
          type="info"
          showIcon
          closable
        />
      )}

      <Row className="user-profile bg-white shadow">
        {/* User Profile Image */}
        <Col md={3} className="user-img-section">
          <div className="profile-img-wrapper">
            <img src={BASE_URL + loggedInUser?.image?.url} alt="User Profile" />
            <div className="change-photo-btn">
              <label htmlFor="user-img">Change</label>
              <input
                type="file"
                className="d-none"
                id="user-img"
                onChange={handleUpdateProfilePicture}
              />
            </div>
          </div>
        </Col>

        {/* User Details */}
        <Col md={9} className="user-detail-section">
          <div className="w-100 d-flex justify-content-between">
            <h4 className="font-primary">{loggedInUser.fullName}</h4>
            <p
              className="edit-btn"
              onClick={() => {
                setSelectedAttr({
                  attr: "fullName",
                  value: loggedInUser.fullName,
                });
                toggleEditModal();
              }}
            >
              Edit
            </p>
          </div>
          {loggedInUser?.email && (
            <div className="w-100 d-flex justify-content-between">
              <h5>{loggedInUser?.email}</h5>
              <p
                className="edit-btn"
                onClick={() => {
                  setSelectedAttr({
                    attr: "email",
                    value: loggedInUser?.email,
                  });
                  toggleEditModal();
                }}
              >
                Edit
              </p>
            </div>
          )}
          {loggedInUser?.company && (
            <div className="w-100 d-flex justify-content-between">
              <p className="w-75">{loggedInUser?.company}</p>
              <p
                className="edit-btn"
                onClick={() => {
                  setSelectedAttr({
                    attr: "company",
                    value: loggedInUser?.company,
                  });
                  toggleEditModal();
                }}
              >
                Edit
              </p>
            </div>
          )}
          {isSeller && (
            <div className="w-100 d-flex justify-content-between">
              <Stack spacing={1} direction="row">
                {userSkills.map((item) => (
                  <Chip label={item} color="primary" />
                ))}
              </Stack>
              <p className="edit-btn" onClick={toggleSkillModal}>
                Add Skill
              </p>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default UserProfile;
