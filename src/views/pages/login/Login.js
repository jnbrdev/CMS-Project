import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "src/authentication/authProvider";
import { Link, redirect} from "react-router-dom";
import { FaUserCircle, FaUserAlt, FaLock } from "react-icons/fa";
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
//import { axios } from "axios";
const LOGIN_URL = "/login/loginUser";

const Login = () => {
  //const history = useHistory();
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    //userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const login = async (e) => {
    axios
      .post(LOGIN_URL, {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.role === "Super Admin" && response.data.status === "Active") {
          window.location.href = '/dashboard';
        }
      });
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
    <CContainer className="logincontainer">
      <CRow className="wrapper">
        <CCol>
          <CCardGroup>
            <CCard className="loginform">
              <CCardBody>
                <CForm>
                  <CCol className="userIcon">
                    <FaUserCircle />
                  </CCol>
                  <p className="text-medium-emphasis">
                    Sign In to your account
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
                  <Link to="/register" className="registernow">
                    <CRow>
                      <CCol>
                        <CButton color="none">Guest? Request here.</CButton>
                      </CCol>
                    </CRow>
                  </Link>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Login;
