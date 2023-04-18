import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "src/authentication/authProvider";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { FaUserCircle, FaUserAlt, FaLock, FaTimes, FaBars } from "react-icons/fa";
import "../../../all-views-scss/_loginstyle.scss";
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
} from "@coreui/react";
import axios from "src/api/axios";
import useAuth from "src/hooks/useAuth";

//import { axios } from "axios";
const LOGIN_URL = "/login/loginUser";

const Login = () => {
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
          console.log(response.data);
          console.log(roles[0])
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
    <CContainer className="login-container">
      <CRow className="login-wrapper">
          <header className="login-header-menu">
          <h3><a class="login-header-menu-logo" href="#"><img src="./images/condo-connect.png"></img></a></h3>
          <nav ref={navRef}>
            <Link to="/homepage">HOME</Link>
            <Link href="/#">ABOUT</Link>
            <Link href="/#">CONTACT</Link>
            <Link to="/login">SIGN IN</Link>
            <button
              className="login-nav-btn nav-close-btn"
              onClick={showNavbar}>
              <FaTimes />
            </button>
          </nav>
          <button
            className="login-nav-btn"
            onClick={showNavbar}>
            <FaBars />
          </button>
        </header>
        <CCol>
          <CCardGroup>
            <CCard className="login-form">
              <CCardBody>
                <CForm>
                  <CCol className="userIcon">
                    <FaUserCircle />
                  </CCol>
                  <p className="text-medium-emphasis">
                    Sign In to your account
                  </p>

                  <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                  >
                    {errMsg}
                  </p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <FaUserAlt />
                    </CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="email"
                      id="email"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <FaLock />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                    />
                  </CInputGroup>
                  <Link>
                    <CRow>
                      <CCol>
                        <CButton color="primary" onClick={login}>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </Link>
                  {/* <Link to="/register" className="registernow">
                    <CRow>
                      <CCol>
                        <CButton color="none">Guest? Request here.</CButton>
                      </CCol>
                    </CRow>
                  </Link> */}
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
        <footer className="footer">
          {/* <h4>Hello Word</h4> */}
        </footer>
      </CRow>
    </CContainer>
  );
};

export default Login;
