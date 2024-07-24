import React, {  useState } from 'react';
import './loginpage.css';
import { Modal, Button } from 'react-bootstrap';
import { login, setPassword } from '../../features/user';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('login');
    const [showModal, setShowModal] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otpMessage, setOtpMessage] = useState("");
    const [otp, setOtp] = useState();
    const [message, setMessage] = useState("");
    const [forgotemail, setForgotemail] = useState("");
    const [showNewModal, setShowNewModal] = useState(false);
    const [file, setFile] = useState(null);
    const [uPass, setUPass] = useState("");

    const initialState = {
        username: '',
        email: '',
        gender: 'male',
        dob: '',
        password: '',
        role: 'ROLE_STUDENT',
        bio: '',
        designation: '',
        contacts: {
            linkedin: '',
            gmail: '',
            youtube: '',
            github: ''
        }
    };
    const [formData, setFormData] = useState(initialState);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in formData.contacts) {
            setFormData(prevState => ({
                ...prevState,
                contacts: {
                    ...prevState.contacts,
                    [name]: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleForgotPasswordClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCloseNewModal = () => {
        setShowNewModal(false);
    }

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const onLoginSubmit = async (event) => {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const loginData = Object.fromEntries(formData.entries()); 
        try {
            const response = await axios.post('/login',loginData);
            if (response.status === 200) {
                const u = response.data;
                setUPass(loginData.password);
                const ud = { id : u.id, username : u.username, email : u.email, role : u.role, password : loginData.password}
                dispatch(login(ud));
                event.target.reset();
                alert("Login Successful");
                navigate('/');
            }
        } catch (error) {
            if (error.response) {
                setMessage('An error occurred. Please try again.');
            } else if (error.request) {
                setMessage('No response received from the server.');
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
        
    }

    const onSignUpSubmit = async (event) => {
        event.preventDefault();
        setMessage("");
        const dataToSubmit = { ...formData };
        dataToSubmit['profilePic'] = file;

        // Remove unnecessary fields if role is not instructor
        if (dataToSubmit.role !== 'ROLE_INSTRUCTOR') {
            delete dataToSubmit.bio;
            delete dataToSubmit.designation;
            delete dataToSubmit.contacts;
        }

        
        try{
            let response;
            if(formData.role === 'ROLE_INSTRUCTOR'){
                response = await axios.post("/addInstructor", dataToSubmit, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            else if(formData.role === 'ROLE_STUDENT'){
                response = await axios.post("/addStudent", dataToSubmit, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
                if(response && response.status === 200)
                    {
                        setFormData(initialState);
                        event.target.reset();
                        alert("Registration Successful");
                        setActiveTab("login");
                }
        }catch (error) {
            if (error.response) {
                        setMessage('An error occurred. Please try again again.');
            } else if (error.request) {
                setMessage('No response received from the server.');
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
      }

    
    const sendOTP = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const e = formData.get("email");
        setForgotemail(e);
        try{
        const response = await axios.post("/forgotPassword", e)
                if(response.status === 200)
                    {
                        setOtp(response.data);
                        setOtpMessage("OTP sent to email");
                        setOtpSent(true);
                }
        }catch (error) {
            if (error.response.status === 404)
                setOtpMessage(error.response.body);
            if (error.response) {
                    setMessage('An error occurred. Please try again. Are you sure account exists');
                    setShowModal(false);
            } else if (error.request) {
                setMessage('No response received from the server.');
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    }

    const verifyOtp = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const o = formData.get("inputotp");
        if(Number(o) === otp)
            {
                setShowModal(false);
                setShowNewModal(true);
            }
    
        
    }

    const changePassword = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const p = formData.get("newpassword");
        const c = formData.get("confirmpassword");
        if(p === c){
            const obj = { "password" : p, "email" : forgotemail}
            try{
                const response = await axios.post("/newPassword", obj);
                if(response.status === 200){
                    alert("password changed succssfully");
                    event.target.reset();
                    setShowNewModal(false);
                }
        }catch(error){
            setShowNewModal(false);
            setMessage("error occured. please try again")
        }
        }
    }

    return (
        <div className='login-container bg-dark'>
        <div className="login-page w-md-75  bg-dark ">
            <div className="toggle-buttons">
            <button className={` ${activeTab === 'signup' ? 'active' : 'text-white'}`}
 onClick={() => handleTabClick('signup')}>Sign Up</button>
            <button className={` ${activeTab === 'login' ? 'active' : 'text-white'}`} onClick={() => handleTabClick('login')}>Login</button>
            </div>
            <div className='forms text-white'>
            {message && <div className="text-danger text-sm mx-auto">{message}</div>}
            <div className='sign-up-form' id={activeTab === 'login' ? 'inactive': ''}>
                    <h1 className='form-heading'>Create an Account</h1><br/>
                    <form className='form' onSubmit={onSignUpSubmit} method='post'>
                <div className="row mb-2">
                    <div className="col-4 mb-2">
                        <label htmlFor="role">Role:</label>
                        <select className="form-select bg-dark text-white" name="role" value={formData.role} onChange={handleChange} required>
                            <option value="ROLE_STUDENT">Student</option>
                            <option value="ROLE_INSTRUCTOR">Instructor</option>
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="username">User Name:</label>
                        <input type="text" className="form-control bg-dark text-white" name="username" value={formData.username} onChange={handleChange} required />
                    </div>
                </div>
                <div className='row'>
                    <div className="col mb-2">
                        <label htmlFor="gender">Gender:</label>
                        <select className="form-select bg-dark text-white" name="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div className="col mb-2">
                        <label htmlFor="dob">Date of Birth:</label>
                        <input type="date" className="form-control bg-dark text-white" name="dob" value={formData.dob} onChange={handleChange} required />
                    </div>
                </div>
                <div className="mb-2">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control bg-dark text-white" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="col">
                                <label htmlFor="profilePic">Profile Picture:  </label><br />
                                <input type="file" className="form-control-file bg-dark text-white" accept='image/*' name="profilePic" value={formData.profilePic} onChange={handleFileChange} required />
                            </div>
                
                {formData.role === 'ROLE_INSTRUCTOR' && (
                    <>
                        <div className='row mb-2'>
                            <div className="col">
                                <label htmlFor="designation">Designation:</label>
                                <input type="text" className="form-control bg-dark text-white" name="designation" value={formData.designation} onChange={handleChange} required />
                            </div>

                        </div>
                        
                        
                        <div className="mb-2 row">
                            <div className='col'>
                                <label htmlFor="linkedin">LinkedIn Profile:</label>
                                <input type="text" className="form-control bg-dark text-white" name="linkedin" value={formData.contacts.linkedin} onChange={handleChange} required />
                            </div>
                            <div className='col'>
                                <label htmlFor="gmail">Gmail:</label>
                                <input type="text" className="form-control bg-dark text-white" name="gmail" value={formData.contacts.gmail} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="mb-2 row">
                            <div className='col'>
                                <label htmlFor="youtube">Youtube:</label>
                                <input type="text" className="form-control bg-dark text-white" name="youtube" value={formData.contacts.youtube} onChange={handleChange} required />
                            </div>
                            <div className='col'>
                                <label htmlFor="github">Guthub Profile:</label>
                                <input type="text" className="form-control bg-dark text-white" name="github" value={formData.contacts.github} onChange={handleChange} required />
                            </div>
                        </div>
                        
                        <div className="mb-2">
                            <label htmlFor="bio">Bio:</label>
                            <textarea className="form-control bg-dark text-white" name="bio" value={formData.bio} onChange={handleChange} required></textarea>
                        </div>
                    </>
                )}
                <div className="mb-2">
                    <label htmlFor="password">Password:</label>
                    <input type="text" className="form-control bg-dark text-white" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <input type='submit' className="btn btn-outline-light mb-5 mx-auto" value='Sign Up' />
            </form>
                </div>

                <div className='login-form' id={activeTab === 'signup' ? 'inactive' : ''}>
                    <h1 className='form-heading'>Login</h1>
                    <form className='form' onSubmit={(event) => onLoginSubmit(event)} method='post'>

                    <div className="mb-2">
                            <label htmlFor="email">Email:</label>
                            <input type="email" className="form-control bg-dark text-white" name="email" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control bg-dark text-white" name="password" />
                            <a href="#" className="forgot-password-link" onClick={handleForgotPasswordClick}>Forgot Password?</a>
                        </div>
                        <button type='submit' className="btn btn-outline-light mb-5 mx-auto" value='Sign Up' >Login</button>

                    </form>

                    <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton className='bg-dark text-white'>
                    <Modal.Title>Forgot Password</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark text-white'>
                    <p>Please enter your email for resetting password. We will send you an OTP .</p>
                    <form className='form' onSubmit={(event) => sendOTP(event)}>
                        <div className='row mb-3'>
                            <div className='col'>
                                <label htmlFor="email">Email:</label>
                                <input type="email" name='email' className="form-control bg-dark text-white" placeholder="Email" disabled={otpSent} />
                                {otpMessage && <div className="text-success text-sm mx-auto">{otpMessage}</div>}
                            </div>
                            <div className='col-4 d-flex align-items-end'>
                                <Button variant="primary" type='submit' className="w-100">
                                Send OTP
                            </Button>
                            </div>
                        </div>
                    </form>
                    <form onSubmit={(event) => verifyOtp(event)}>
                        <div className='row mb-3'>
                            <div className='col'>
                            <label htmlFor="inputotp">OTP:</label>
                                <input type="text" name='inputotp' pattern='[0-9]{6}' className="form-control bg-dark text-white" 
                                    inputMode="numeric" placeholder="Enter OTP" disabled={!otpSent}
                                    onKeyDown={(e) => {
                                        if (!/^\d$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                                            e.preventDefault();
                                        }
                                    }}
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^\d]/g, '').slice(0, 6);
                                    }} />
                            </div>
                            <div className='col-4 d-flex align-items-end'>
                                <Button variant="primary" type='submit' className="w-100" disabled={!otpSent}>
                                Verify
                            </Button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
                </div>

                <Modal show={showNewModal} onHide={handleCloseNewModal}>
                <Modal.Header closeButton className='bg-dark text-white'>
                    <Modal.Title>Enter New Password</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark text-white'>
                    <p>Please enter new password for {forgotemail}</p>
                    <form className='form' onSubmit={(event) => changePassword(event)}>
                        <div className='row mb-3 w-100'>
                            <div className='col'>
                                <label htmlFor="newpassword">Password:</label>
                                <input type="password" name='newpassword' className="form-control bg-dark text-white" placeholder="New Password" />
                            </div>
                        </div>

                        <div className='row mb-3 w-100'>
                            <div className='col'>
                                <label htmlFor="confirmpassword">New Password:</label>
                                <input type="password" name='confirmpassword' className="form-control bg-dark text-white" placeholder="Confirm Password" />
                            </div>
                        </div>
                        <Button variant="primary" type='submit' >
                                Change Password
                            </Button>
                    </form>
                </Modal.Body>
                
            </Modal>

            </div>
        </div>
        </div>
    );
}

export default LoginPage;
