import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "src/authentication/authProvider";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { FaUsersCog, FaUserPlus, FaTimes, FaBars } from 'react-icons/fa';
import { MdDriveFileRenameOutline, MdContactPhone, MdCake, MdEmail, MdNumbers } from 'react-icons/md';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { BiMaleFemale, BiHome } from 'react-icons/bi';
import "../../../all-views-scss/_registerstyle.scss";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
} from "@coreui/react";
import axios from "src/api/axios";
import useAuth from "src/hooks/useAuth";

//import { axios } from "axios";
const LOGIN_URL = "/login/loginUser";

const Register = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle(
      "responsive_nav"
    );
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const login = async (e) => {
    e.preventDefault();
    try {
      axios
        .post(LOGIN_URL, {
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.data.message === "Login Successfully!") {
            setErrMsg("Login Succesfully");
          } else if (
            response.data.message === "Email or Password does not match!"
          ) {
            setErrMsg("Email and Password Doesn't Match");
          } else if (response.data.message === "Wrong Password") {
            setErrMsg("Email and Password Doesn't Match");
          } else {
            setErrMsg("Login Failed");
          }

          const roles = response?.data?.role;
          if (roles === 'Super Admin') {
            const accessToken = response?.data?.accessToken;
            const roles1 = [1, 'Super Admin']
            const full_name = response?.data?.full_name
            setAuth({ email, password, full_name, roles1, accessToken });
            navigate('/dashboard')
          } else if (roles === 'Admin') {
            const accessToken = response?.data?.accessToken;
            const roles1 = [2, 'Admin']
            const full_name = response?.data?.full_name
            console.log(roles1, accessToken);
            setAuth({ email, password, full_name, roles1, accessToken });

            navigate('/admin')
          } else if (roles === 'Unit Owner') {
            const accessToken = response?.data?.accessToken;
            const roles1 = [3, 'Unit Owner']
            const full_name = response?.data?.full_name
            const acc_balance = response?.data?.acc_balance
            console.log(roles1, accessToken);
            setAuth({ email, password, full_name, acc_balance, roles1, accessToken });

            navigate('/unitowner')
          } else if (roles === 'Tenant') {
            const accessToken = response?.data?.accessToken;
            const roles1 = [4, 'Tenant']
            const full_name = response?.data?.full_name
            const acc_balance = response?.data?.acc_balance
            console.log(roles1, accessToken);
            setAuth({ email, password, full_name, acc_balance, roles1, accessToken });

            navigate('/tenants')
          }

          console.log(response.data);
          console.log(roles);
          errRef.current.focus();
        });
    } catch (error) {
      console.log(error);
      if (!error.response) {
        setErrMsg("No Server Response");
      }
    }
  };

  {
    /*const handleSubmit = async (e) => {
    //e.preventDefault();
    console.log("sad")
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({email, password}))
      setSuccess == true;
      console.log(JSON.stringify(response))
    } catch (err) {
      console.log(err)
    }
    
  }*/
  }

  return (
    <div>

      <header className="register-header-menu">
        <Link to="/homepage">
          <img src="./images/condo-connect.png" class="login-header-menu-logo" />
        </Link>
        <nav ref={navRef}>
          <Link to="/homepage">HOME</Link>
          <Link href="/#">ABOUT</Link>
          <Link href="/#">CONTACT</Link>
          <Link to="/login">SIGN IN</Link>
          <button
            className="register-nav-btn nav-close-btn"
            onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button
          className="register-nav-btn"
          onClick={showNavbar}>
          <FaBars />
        </button>
      </header>

      <CContainer className="register-container">
        {/* <CRow className="register-wrapper"> */}
        <CCol className="col-md-5" id="register-col">
          <CCardGroup>
            <CCard className="register-form">
              <CCardBody className="register-form-body">
                <CForm>
                  <p> SIGN UP </p>

                  <CRow>
                    <CCol className="col-md-6">
                      <CInputGroup className="mb-3">
                        <CInputGroupText className="input-icon">
                          <FaUsersCog />
                        </CInputGroupText>
                        <CFormSelect
                          type="text"
                          id="role"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setRole(e.target.value)}
                          required
                        >
                          <option value="">Select Role</option>
                          <option value="Unit Owner">Unit Owner</option>
                          <option value="Tenant">Tenant</option>
                        </CFormSelect>
                      </CInputGroup>
                    </CCol>
                    <CCol className="col-md-6">
                      <CInputGroup className="mb-3">
                        <CInputGroupText className="input-icon">
                          <MdNumbers />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          placeholder="Enter unit number"
                          id="unit_no"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setUnitNo(e.target.value)}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol className="col-md-6">
                      <CInputGroup className="mb-3">
                        <CInputGroupText className="input-icon">
                          <MdDriveFileRenameOutline />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          placeholder="Enter firstname"
                          id="first_name"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setFname(e.target.value)}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol className="col-md-6">
                      <CInputGroup className="mb-3">
                        <CInputGroupText className="input-icon">
                          <MdDriveFileRenameOutline />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          placeholder="Enter lastname"
                          id="last_name"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setLname(e.target.value)}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol className="col-md-6">
                      <CInputGroup className="mb-3">
                        <CInputGroupText className="input-icon">
                          <FaUserPlus />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          placeholder="Enter age"
                          id="age"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setAge(e.target.value)}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol className="col-md-6">
                      <CInputGroup className="mb-3">
                        <CInputGroupText className="input-icon">
                          <BiMaleFemale />
                        </CInputGroupText>
                        <CFormSelect
                          type="text"
                          id="gender"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setGender(e.target.value)}
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </CFormSelect>
                      </CInputGroup>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol className="col-md-6">
                      <CInputGroup className="mb-3">
                        <CInputGroupText className="input-icon">
                          <MdContactPhone />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          placeholder="Enter contact number"
                          id="contact_no"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setContactNo(e.target.value)}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol className="col-md-6">
                      <CInputGroup className="mb-3">
                        <CInputGroupText className="input-icon">
                          <MdCake />
                        </CInputGroupText>
                        <CFormInput
                          type="date"
                          placeholder="yyyy-mm-dd"
                          id="birthdate"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setBdate(e.target.value)}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol className="col-md-12">
                      <CInputGroup className="mb-3">
                        <CInputGroupText className="input-icon">
                          <MdEmail />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          placeholder="Enter email address"
                          id="email"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setAddress(e.target.value)}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol className="col-md-6">
                      <CInputGroup className="mb-3">
                        <CInputGroupText className="input-icon">
                          <BsFillShieldLockFill />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Enter password"
                          id="password"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setUserPassword(e.target.value)}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol className="col-md-6">
                      <CInputGroup className="mb-3">
                        <CInputGroupText className="input-icon">
                          <BsFillShieldLockFill />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Confirm password"
                          id="confim_password"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setUserConfirmPassword(e.target.value)}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>

                  <Link>
                    <CRow>
                      <CCol className="button-row">
                        <CButton color="primary" className="register">
                          Submit
                        </CButton>
                      </CCol>
                    </CRow>
                  </Link>
                  <br />
                  {/* <p className="register-label">Don't have account? </p>
                    <Link to="/register" className="registernow">
                      <CCol className="reg-btn-col">
                        <CButton color="none">Signup here</CButton>
                      </CCol>
                    </Link> */}
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
        {/* <CCol className="col-md-6" id="welcome-col">
            <CCardGroup>
              <CCard className="register-form">
                <CCardBody>
                  <img src="./images/condo-connect.png"></img><br/>
                  <h1 className="welcome-back">WELCOME BACK!</h1><br/>
                  <p className="sign-access">Sign in to continue access</p>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol> */}
        {/* </CRow> */}
      </CContainer>

      <footer className="footer">
        {/* <h4>Hello Word</h4> */}
      </footer>
    </div>
  );
};

export default Register;
