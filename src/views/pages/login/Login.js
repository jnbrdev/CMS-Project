import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserCircle, FaUserAlt, FaLock } from 'react-icons/fa'
import '../../../all-views-scss/_loginstyle.scss'
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
} from '@coreui/react'

const Login = () => {
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
                  <p className="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <FaUserAlt />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <FaLock />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                    />
                  </CInputGroup>
                  <Link to="/dashboard" className="login">
                    <CRow>
                      <CCol>
                        <CButton color="primary">Login</CButton>
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
  )
}

export default Login
