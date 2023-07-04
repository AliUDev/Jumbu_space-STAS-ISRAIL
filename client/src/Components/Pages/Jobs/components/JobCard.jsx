import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import { AiFillStar, AiOutlineClockCircle } from "react-icons/ai";
import { BASE_URL } from "../../../utils/contants";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';



const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const addedDaysBefore =
    Math.abs(new Date() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24);
  const label =
    addedDaysBefore < 5 ? "New" : job.customer.rating === 5 ? "Popular" : "See";

    
    useEffect(()=>{
      document.title = `Jambu Space ( Jobs )`
  })

  return (
    <Col key={job._id} xs={12} sm={12} md={12} lg={6} className="my-2">
      <div className="job-card mx-2 border ">
        <div className="card-header-top ">
          {/* <img className="job-image" src={BASE_URL + job?.image?.url} alt="No Img " /> */}

         
        </div>

        <div className="card-body-content border-bottom py-3 px-3  d-flex flex-column justify-content-between">
          <h6 className=" mt-1 mb-3 text-capitalize fs-5">{job.title}</h6>

         
         <div className="row">
            <div className="col-2">
          {label && (
            <div className="top-tag bg-primary text-light text-center rounded-pill px-2 " >
              <p className="mb-0" style={{fontSize:"14px"}}>{label}</p>
            </div>
          )}
           
            </div>
            <div className="col-10 text-muted mb-2">
              Hourly- Posted 25 minutes ago
            </div>
          </div>
          
          <div className="row mt-3">
            <div className="col-4 ">
              <p className="p-0 m-0 fw-normal">30+ hrs/week</p>
              <p className="text-muted p-0 m-0 ">Hours Needed</p>
            </div>
            <div className="col-4">
            <p className="p-0 m-0 fw-normal">More than 6 months</p>
              <p className="text-muted p-0 m-0 ">Duration</p>
            </div>
            <div className="col-4">
            <p className="p-0 m-0 fw-normal">Intermediate</p>
              <p className="text-muted p-0 m-0 ">Experiance Level</p>
            </div>

          </div>
          <div>
            <p className="dis-para mt-3">Hello There, Need an agile and smart colleague to help me with general day to day tasks. We will have a general overview of tasks for Hello There, Need an agile and smart colleague to help me with general day to day tasks. We will have a general overview of tasks fo w…</p>
          </div>
          <div className="mt-1">
          <Chip className="chip-jobs" label="React js" />
          <Chip className="chip-jobs" label="Web Application" />
          <Chip className="chip-jobs" label="UI" />
          <Chip className="chip-jobs" label="Best UX" />
          </div>
          <div className="mt-3 mb-2">
          <Link className="btn btn-primary btn-sm rounded-pill fw-normal col-3 " to="/jobs/details" >See More</Link>
          </div>
          {/* <Row className="justify-content-between align-items-center">
            <Col xs={12} sm={12} md={12} lg={12}>
              <p className="mb-0">
                From
                <span className="fw-bold mx-1 text-success">${job.budget}</span>
              </p>
            </Col>

            <Col xs={12} sm={12} md={12} lg={12}>
              <div className="d-flex align-items-center">
                <AiOutlineClockCircle size={16} className="text-muted me-1" />
                <p className="mb-0 text-muted">
                  {`Due ${moment(job.dueDate).fromNow()}`}
                </p>
              </div>
            </Col>
          </Row> */}
        </div>

        {/* <Row className="card-footer-content justify-content-between align-items-center py-2 px-3">
          <Col sm={9} className="footer-left d-flex align-items-center">
            <div className="footer-img-wrapper me-2">
              <img
                className="job-client-image"
                src={BASE_URL + job?.customer?.image?.url}
                onClick={() =>
                  navigate(`/pages/user-detail/${job.customer._id}`)
                }
                alt=""
              />
            </div>

            <p className="mb-0 job-card-customer-name">
              {job?.customer?.fullName}
            </p>
          </Col>

          <Col
            sm={3}
            className="footer-right d-flex align-items-center justify-content-end"
          >
            <AiFillStar className="color-primary" />
            <p className="mb-0 mx-1">{job?.customer?.rating || 5}</p>
          </Col>
        </Row> */}
      </div>
    </Col>
  );
};

export default JobCard;
