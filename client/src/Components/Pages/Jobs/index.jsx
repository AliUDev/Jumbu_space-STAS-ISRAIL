import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Input, Button } from "antd";
import axios from "axios";
import { SpinnerRoundFilled } from "spinners-react";
import CustomNavbar from "../../Common/CustomNavbar/Index";
import CustomFooter from "../../Shared/Footer/CustomFooter";
import JobCard from "./components/JobCard";
import "../../Stylesheet/Jobs/jobs.scss";
import "../../Stylesheet/Jobs/jobsdetails.scss";

import { API_URL } from "../../utils/contants";

const { Search } = Input;

const JobsPage = () => {
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL + "jobs")
      .then(res => {
        setJobs(res.data);
        setFilteredJobs(res.data);
        setJobsLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSearch = value => {
    const filteredJobs = value
      ? [...jobs].filter(item => item.title.includes(value))
      : jobs;
    setFilteredJobs(filteredJobs);
  };

  return (
    <>
      <CustomNavbar />

      <Container className="container-2">
        <Row>
          <Col md={9}>
            <h2 className="color-primary font-rebrand fw-bold m-0">Jobs</h2>
            <p className="my-4 font-18 text-muted">
              Here are some jambu-space jobs for you. Lets pick one!!!
            </p>

            <h5 className="m-0 mb-1">Top Projects you may like</h5>
            <div className="d-flex align-items-center justify-content-between">
              <p className="mb-0">
                These projects are highly rated by other clients
              </p>
            </div>
          </Col>
          <Col md={3} className="d-flex">
            <Search
              placeholder="Search Jobs"
              onSearch={handleSearch}
              enterButton
              allowClear
            />
            <Button type="link" onClick={() => setFilteredJobs(jobs)}>
              Reset
            </Button>
          </Col>
        </Row>

        <Row className="justify-content-start my-4">
          {jobsLoading ? (
            <SpinnerRoundFilled
              size={80}
              thickness={200}
              сolor="#3592d5"
              secondaryColor="blue"
            />
          ) : (
            filteredJobs
              .filter(job => !job.deliveryDate)
              .map(item => <JobCard job={item} />)
          )}
        </Row>
      </Container>

      <CustomFooter />
    </>
  );
};

export default JobsPage;
