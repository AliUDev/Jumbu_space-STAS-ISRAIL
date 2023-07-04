import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import CustomNavbar from '../../../Common/CustomNavbar/Index';
import CustomFooter from '../../../Shared/Footer/CustomFooter';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const JobProposal = () => {
    useEffect =() =>{
        document.title = "Proposal"
    }

    const [visible, setVisible] = useState(false);
    const [visibl, setVisibl] = useState(false);

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
    const handleChange2 = (event) => {
        const { name, value } = event.target;
        setProjectBased((prevState) => {
          return {
            ...prevState,
            [name]: value,
          };
        });
      };


    const [JumboSpaceCharges, setJumboSpaceCharges] = useState(20);
    console.log(JumboSpaceCharges);


    const [projectBased, setProjectBased] = useState({
        bid: 0,
    });
    console.log(projectBased.bid)

    const abc =  projectBased.bid /100 * JumboSpaceCharges ;

    const ab = abc.toFixed(2);
    
    console.log(ab)


     const bidTotel = projectBased.bid - ab;


    return (

        


        <div>
            <CustomNavbar/>
            <div className='container'>
                <h3 className='mt-2'>Submit Proposal</h3>
                <div className='d-flex justify-content-between  p-3 px-4' style={{border:"1px solid silver", borderRadius:"4px 4px 0px 0px", borderBottom:"0px solid"}}>
                    <h4 className='mb-0'>Terms</h4>
                    <h5 className="text-muted">Client's budget: $30.00 USD</h5>

                </div>
                <div style={{border:"1px solid silver", borderRadius:"0px 0px 4px 4px"}}>
                    <div className='container p-3 px-4'>
                        <p className='fw-bold text-primary'>How do you want to be paid?</p>
                        <div>
                        <input type="radio" id="html" name="fav_language" value="1" onClick={()=> setVisible(true) +  setVisibl(false)  }  />
                        <lable className="fw-normal fs-6 mx-2" >Milestion</lable>
                        <p className='text-muted'>Divide the project into smaller segments, called milestones. You'll be paid for milestones as they are completed and approved.</p>
                        </div>
                        <div>
                        <input type="radio" id="html" name="fav_language" value="1" onClick={()=> setVisibl(true)  + setVisible(false) }  />
                        <lable className="fw-normal fs-6 mx-2"  >By Project</lable>
                        <p className='text-muted'>Get your entire payment at the end, when all work has been delivered.</p>
                        </div>

                        {
                            visible &&

                            <div>
                                <p className='fw-bold text-primary'>How many milestones do you want to include?</p>
                                <div className='row'>
                                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12'>
                                <label className='mb-2 fs-5 fw-bold'>Discription</label>
                                <input type="text" class="form-control" />
                                </div>
                                <div className='col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12'>
                                <label className='mb-2 fs-5 fw-bold'>Due Date</label>
                                <input type="date" class="form-control" />
                                </div>
                                <div className='col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12'>
                                <label className='mb-2 fs-5 fw-bold'>Amount</label>
                                <div class="input-group ">
                                  <div class="input-group-prepend" >
                                    <span class="input-group-text">$</span>
                                  </div>
                                  <input type="number" class="form-control" name='bid' onChange={handleChange2} aria-label="Amount (to the nearest dollar)"/>
                                  <div class="input-group-append">
                                    <span class="input-group-text">.00</span>
                                  </div>
                                </div>
                                </div>
  

                                </div>

                                <div>
                                    <div className='d-flex justify-content-between mt-4'>
                                        <div>
                                        <label className='fs-6 fw-bold'>Total price of project</label>
                                        <p>This includes all milestones, and is the amount your client will see</p>
                                        </div>
                                        <div className='align-self-center'>
                                            <p className='fs-5 fw-bolder'>{projectBased.bid}</p>
                                        </div>
                                        
                                    </div>
                                    <hr/>

                                </div>
                                <div>
                                    <div className='d-flex justify-content-between mt-4'>
                                        <div>
                                        <label className='fs-6 fw-bold'>Jambuspace Service Fee</label>
                                        {/* <p>This includes all milestones, and is the amount your client will see</p> */}
                                        </div>
                                        <div className='align-self-center'>
                                            <p className='fs-5 fw-bolder'>-{ab}</p>
                                        </div>
                                        
                                    </div>
                                    <hr/>

                                </div>
                                <div>
                                    <div className='d-flex justify-content-between mt-4'>
                                        <div>
                                        <label className='fs-6 fw-bold'>You will receive</label>
                                        <p>Your estimated payment, after service fees</p>
                                        </div>
                                        <div className='align-self-center'>
                                            <p className='fs-5 fw-bolder'>{bidTotel}</p>
                                        </div>
                                        
                                    </div>

                                </div>
                            </div>
                        }
                        {
                            visibl &&

                            <div>
                                <p className='fw-bold text-primary'>What is the full amount you'd like to bid for this job?</p>
                                <div>
                                    <div className='d-flex justify-content-between mt-4'>
                                        <div>
                                        <label className='fs-6 fw-bold'>Bid</label>
                                        <p>Total amount the client will see on your proposal</p>
                                        </div>
                                        <div className='align-self-center'>
                                        <div className=''>
                                     <div class="input-group ">
                                      <div class="input-group-prepend">
                                        <span class="input-group-text">$</span>
                                      </div>
                                     <input type="number" onChange={handleChange2} name="bid" class="form-control" aria-label="Amount (to the nearest dollar)"/>
                                     <div class="input-group-append">
                                      <span class="input-group-text">.00</span>
                                      </div>
                                    </div>
                                    </div>
                                    </div>
                                        
                                    </div>
                                    <hr/>
                                    <div className='d-flex justify-content-between mt-4'>
                                        <div>
                                        <label className='fs-6 fw-bold'>JumboSpace Service Fee</label>
                                        <p>This includes all milestones, and is the amount your client will see</p>
                                        </div>
                                        <div className='align-self-center'>
                                        <p className='fs-5 fw-normal text-danger'>-{ab}</p>
                                    </div>
                                        
                                    </div>
                                    <hr/>
                                    <div className='d-flex justify-content-between mt-4'>
                                        <div>
                                        <label className='fs-6 fw-bold'>You’ll Receive</label>
                                        <p>The estimated amount you'll receive after service fees </p>
                                        </div>
                                        <div className='align-self-center'>
                                        <p className='fs-5 fw-bold text-success'>{bidTotel}</p>
                                    </div>
                                        
                                    </div>

                                </div>
                            </div>
                        }


                    </div>
                </div>

                <div className='mt-5' style={{border:"1px solid silver", borderRadius:"4px"}}>
                    <div className='container p-3 px-4'>
                     <h4>How long this project will take?</h4>
                     <InputLabel id="demo-simple-select-label">Age</InputLabel>
                     <Select
                       labelId="demo-simple-select-label"
                       id="demo-simple-select"
                       value={age}
                       label="Enter the duration"
                       onChange={handleChange}
                     >
                       <MenuItem value={10}>Less than Month</MenuItem>
                       <MenuItem value={20}>Month</MenuItem>
                       <MenuItem value={30}>More than a Month</MenuItem>
                       <MenuItem value={30}>3 to 6 Month</MenuItem>
                       <MenuItem value={30}>More than 6 Month</MenuItem>
                     </Select>

                    </div>
                </div>
                <div className='mt-5' style={{border:"1px solid silver", borderRadius:"4px"}}>
                    <div className='container p-3 px-4'>
                    <h4>Cover Letter</h4>
                    <textarea
                    placeholder="Describe your job"
                    className="form-control"
                    name="description"
                    cols="30"
                    rows="5"
                  ></textarea>
                  <div className="mb-3 mt-4">
                  <h5  htmlFor="formFile" className="form-label">Drop your works and CV there</h5>
                  <input className="form-control" type="file" id="formFile" />
                </div>


                    </div>
                </div>


                <div className='mt-4 mb-3 ' >
                <button className='btn btn-primary btn-lg w-100'>Submit</button>
                </div>
            </div>
            <CustomFooter/>
        </div>
    );
}

export default JobProposal;
