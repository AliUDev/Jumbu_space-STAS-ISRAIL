import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import CustomNavbar from '../../../Common/CustomNavbar/Index';
import CustomFooter from '../../../Shared/Footer/CustomFooter';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import WorkIcon from '@mui/icons-material/Work';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const JobDetails = () => {
  const navigate = useNavigate();


    useEffect(()=>{
        document.title = `Jambu Space ( Job Details )`

    })

    return (
        <div>
            <CustomNavbar/>
            <div className='container mt-4'>
            <div className='row'>
                <div className='col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 '>
                    <div>
                        <p className='job-details-title mb-0 pb-0'>$30 an hour for simple online tasks</p>
                        
                    </div>
                    <hr />
                    <div>
                        <p>The application of our company needs several freelancers to test and use and give feedback. They work about 2 hours a day and the salary is 30 DOLLARS per hour. If you are interested, please contact me as soon as possible</p>
                    </div>
                    <hr />
                    <div className='row p-3'>
                        <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6'>
                            <div className='row'>
                            <div className='col-1 pt-3'>
                           <AccessTimeIcon style={{fontSize:"17px"}} />
                           </div>
                           <div className='col-8 pt-1'>
                           <p  className="fw-bold details-p">Less than 30 hrs/week</p>
                           </div>
                           <div className='row'>
                               <div className='col-1'></div>
                               <div className='col-8 text-muted'>
                                   Hourly
                               </div>
                           </div>             
                           </div>                         
                        </div>


                        <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6'>
                            <div className='row'>
                            <div className='col-1 pt-3'>
                           <CalendarMonthIcon style={{fontSize:"17px"}} />
                           </div>
                           <div className='col-8 pt-1'>
                           <p className="fw-bold details-p"> Less than 1 month</p>
                           </div>
                           <div className='row'>
                               <div className='col-1'></div>
                               <div className='col-8 text-muted'>
                                   Duration
                               </div>
                           </div>             
                           </div>                         
                        </div>
                        

                        <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6'>
                            <div className='row'>
                            <div className='col-1 pt-3'>
                           <PsychologyIcon style={{fontSize:"17px"}} />
                           </div>
                           <div className='col-8 pt-1'>
                           <p className="fw-bold details-p">Intermediate Level</p>
                           </div>
                           <div className='row'>
                               <div className='col-1'></div>
                               <div className='col-8 text-muted'>
                               Experience Level
                               </div>
                           </div>             
                           </div>                         
                        </div>
                        

                        <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6'>
                            <div className='row'>
                            <div className='col-1 pt-3'>
                           <AddLocationIcon style={{fontSize:"17px"}} />
                           </div>
                           <div className='col-8 pt-1'>
                           <p className="fw-bold details-p-2">Remote Job</p>
                           </div>
                           {/* <div className='row'>
                               <div className='col-1'></div>
                               <div className='col-8 text-muted'>
                               Experience Level
                               </div>
                           </div>              */}
                           </div>                         
                        </div>
                        
                        <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6'>
                            <div className='row'>
                            <div className='col-1 pt-3'>
                           <WorkIcon style={{fontSize:"17px"}} />
                           </div>
                           <div className='col-8 pt-1'>
                           <p className="fw-bold details-p"> One-time project</p>
                           </div>
                           <div className='row'>
                               <div className='col-1'></div>
                               <div className='col-8 text-muted'>
                               Project Type
                               </div>
                           </div>             
                           </div>
                                                  
                        </div> 
                        <hr className='mt-4'/> 

                        <div className='mt-3 mb-3'>
                            <h4>Skills and Expertise</h4>
                            <div className="mt-1">
                            <Chip className="chip-jobs mt-3" label="React js" />
                            <Chip className="chip-jobs mt-3" label="Web Application" />
                            <Chip className="chip-jobs mt-3" label="UI" />
                            <Chip className="chip-jobs mt-3" label="Best UX" />
                            <Chip className="chip-jobs mt-3" label="Nodejs" />
                            <Chip className="chip-jobs mt-3" label="Express" />
                            </div>
                        </div>
                        <hr className='mt-4'/> 

                        <div>
                            <h4>About Client</h4>
                            <div className='row'>
                            <div className='col-1'>
                            <Avatar  sx={{ width: 55, height: 55 }} alt="Remy Sharp" src="https://www.w3schools.com/howto/img_avatar.png" />
                            </div>
                            <h5 className='col-11 mt-4 px-3 fw-normal text-dark'>Ch.Faizan</h5>
                            </div>
                        </div>


                        <hr className='mt-4'/> 
                        <div className=''>
                        <Link style={{backgroundColor:"#003D69"}} className='btn text-light  btn-md rounded-pill mb-4 mt-3' to="/job/submitproposal">Apply Now</Link>
                        </div>

                     

                        
                        



                    </div>
                </div>
                <div className='col-xl-4 col-lg-4 col-md-0 col-sm-0 col-0 login-form-column mt-3'>
                <div className=' mt-5  p-5 job-section-signup'>
                    <h4 className='text-light'>Create a free profile to find work like this</h4>
                    <p className=' text-light'>What are you waiting for register now to apply to a Job!</p>
                    <Link style={{backgroundColor:"#003D69"}} to="/signup"  className='btn text-light  btn-md w-100  mt-3' >Sign Up</Link>

                </div>
                    

                </div>

            </div> 
            </div>





            <CustomFooter />
           
        </div>
    );
}

export default JobDetails;
