import React, { useEffect, useState } from "react";
import { Container, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Button, Upload } from "antd";
import { AiOutlineUpload } from "react-icons/ai";
import axios from "axios";
import CustomButton from "../../Common/Button/CustomButton";
import CustomNavbar from "../../Common/CustomNavbar/Index";
import CustomFooter from "../../Shared/Footer/CustomFooter";
import { API_URL } from "../../utils/contants";
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';





const PostJob = () => {

  useEffect(()=>{
     document.title = "Jumbo Space (Post Job)"
  })
  

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
  ];

  
  const user = JSON.parse(localStorage.getItem("authUser"));  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    hoursNeeded: "",
    duration:"",
    experiencelevel:"",
    technologies: [{}],
    budget: "",
    dueDate: new Date(),
    image: null,
  });
  
  

  const handleChange = e => {
    setFormData(prevState => ({
      ...prevState,
       [e.target.name]: e.target.value ,       
    }));
  };

  console.log(formData);

  
  const handleSubmit = () => {
    // Check Validation
    const emptyFields = Object.keys(formData).filter(key => !formData[key]);
    const anyInvalidField = emptyFields.length > 0 ? true : false;
    if (anyInvalidField) toast.error(`${emptyFields[0]} is required`);

    if (!anyInvalidField) {
      const payload = new FormData();

      payload.append("title", formData.title);
      payload.append("hoursNeeded", formData.hoursNeeded);
      payload.append("duration", formData.duration);
      payload.append("experiencelevel", formData.experiencelevel);
      payload.append("technologies", formData.technologies);
      payload.append("description", formData.description);
      payload.append("budget", formData.budget);
      payload.append("dueDate", formData.dueDate);
      payload.append("customerID", user._id);
      payload.append("image", formData.image);

      axios
        .post(API_URL + "jobs", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(res => {
          toast.success(res.data.message);
          setFormData({
            title: "",
            description: "",
            hoursNeeded: "",
            duration:"",
            experiencelevel:"",
            technologies: [],
            budget: "",
            dueDate: new Date(),
            image: null,
          });
        })
        .catch(() => toast.error("Something went wrong"));
    }
  };

  const [receivers, setReceivers] = useState([]);
  // console.log(receivers);

  return (
    <>
      <CustomNavbar />

      <Container fluid className="container-2 mb-5">
        <Container className="section-2">

          
            <Col xs={12} md={6} className="d-flex align-items-center">
              {/* <img className="jobs-image" src={jobsImage} alt="Jobs" /> */}
            </Col>
            {/* <Col xs={12} md={6} className="p-3"> */}
              <div className="form-header w-100 border-bottom">
                <h4 className="mb-3">Post a Job</h4>
                <h6>Job Details</h6>
              </div>

              <div className="mt-3 row">
                <div className="input-wrapper my-4 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                  <span className="input-label">Job Title</span>
                  <input
                    placeholder="Your job title here"
                    value={formData.title}
                    className="form-control"
                    onChange={handleChange}
                    name="title"
                    type="text"
                  />
                </div>
                <div className="input-wrapper my-4 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                  <span className="input-label">Work Hours/Days</span>
                  <input
                    placeholder="Your job title here"
                    value={formData.hoursNeeded}
                    className="form-control"
                    onChange={handleChange}
                    name="hoursNeeded"
                    type="text"
                  />
                </div>


                <div className="input-wrapper my-4  col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <span className="input-label">Duration of the project</span>
                <select id="duration" onChange={handleChange} name="duration" defaultValue={formData.duration} className="form-select">
                 <option select="true" value="less than a week">Less than a week</option>
                 <option value="less than a month">Less than a month</option>
                 <option value="month">Month</option>
                 <option value="less than 6 months">Less than 6 Months</option>
                 <option value="less than year">Less than Year</option>
                 <option value="year">Year</option>
                 <option value="more than 1 year">Year than 1 year</option>
                </select>
                </div>

                <div className="input-wrapper my-4  col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <span className="input-label">experiencelevel Level</span>
                <select id="experiencelevel" onChange={handleChange} name="experiencelevel" defaultValue={formData.experiencelevel} className="form-select">
                 <option select="true" value="Entry-level">Entry-level</option>
                 <option value="Intermediate">Intermediate</option>
                 <option value="Mid-level">Mid-level</option>
                 <option value="Senior">Senior</option>
                
                </select>
                </div>




                  <div className=" col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <span className="input-label">Budget</span>
                    <input
                      placeholder="Budget"
                      value={formData.budget}
                      className="form-control"
                      onChange={handleChange}
                      name="budget"
                      type="number"
                    />
                  </div>
             
                  <div className=" col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <span className="input-label">Due Date</span>
                    <input
                      value={formData.dueDate}
                      className="form-control"
                      onChange={handleChange}
                      name="dueDate"
                      type="date"
                    />
                  </div>

                       
                <div className="input-wrapper my-4 col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12">
                  <span className="input-label">Job Description</span>
                  <textarea
                    placeholder="Describe your job"
                    className="form-control"
                    value={formData.description}
                    name="description"
                    onChange={handleChange}
                    cols="30"
                    rows="5"
                  ></textarea>
                </div>







                  <div className=" col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12 mt-3">
                <Stack spacing={3} style={{width:"100%"}}>
                <Autocomplete
                multiple
                onChange={(e, value) => setReceivers((state) => value)}
                id="tags-filled"
                options={top100Films.map((option) => option.title)}
                freeSolo
                name="technologies"
                // onChange={handleChange}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })}
                  />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="Enter technologies and expertise you required"
                    placeholder="Required technologies"
                    name="technologies"
                    value={formData.technologies = receivers}
                  />
                )}
              />
                </Stack>
                </div>
                <div className="input-wrapper my-4 d-flex justify-content-between col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                  <Upload
                    name="image"
                    maxCount={1}
                    onChange={selected => {
                      setFormData(prevState => ({
                        ...prevState,
                        image: selected.file,
                      }));
                    }}
                    beforeUpload={() => false}
                    listType="picture"
                    accept="image/png, image/jpeg"
                  >
                    <Button icon={<AiOutlineUpload className="me-2" />}>
                      Click to upload job image
                    </Button>
                  </Upload>
                </div>

                <div className="form-cont-bottom">
                  <CustomButton
                    values="Post Job"
                    type="primary"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            {/* </Col> */}
        </Container>
        
      </Container>

      <CustomFooter />
    </>
  );
};

export default PostJob;
