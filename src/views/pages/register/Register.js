import React from 'react'
import '../../../all-views-scss/_registerstyle.scss'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CDropdown,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPenNib,
  cilUser,
  cilWc,
  cilGlobeAlt,
  cilAddressBook,
  cilBirthdayCake,
  cilLocationPin,
  cilIndustry,
} from '@coreui/icons'

const Register = () => {
  return (
    <CContainer className="registercontainer">
      <CRow className="wrapper">
        <CCol>
          <CCard className="registerform">
            <CCardBody>
              <CForm>
                <h1>GUEST REQUEST FORM</h1>
                <CCol className="text-divider">Personal Information</CCol>
                <CRow className="row">
                  <CCol className="col-md-6">
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilPenNib} />
                      </CInputGroupText>
                      <CFormInput placeholder="Firstname" autoComplete="firstname" />
                    </CInputGroup>
                  </CCol>
                  <CCol className="col-md-6">
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilPenNib} />
                      </CInputGroupText>
                      <CFormInput placeholder="Lastname" autoComplete="lastname" />
                    </CInputGroup>
                  </CCol>
                </CRow>
                <CRow className="row">
                  <CCol className="col-md-6">
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilWc} />
                      </CInputGroupText>
                      <CFormSelect className="costum-select">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </CFormSelect>
                    </CInputGroup>
                  </CCol>
                  <CCol className="col-md-6">
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilGlobeAlt} />
                      </CInputGroupText>
                      <CFormInput placeholder="Nationality" autoComplete="Nationality" />
                    </CInputGroup>
                  </CCol>
                </CRow>
                <CRow className="row">
                  <CCol className="col-md-6">
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilAddressBook} />
                      </CInputGroupText>
                      <CFormInput placeholder="Contact Number" autoComplete="contactNum" />
                    </CInputGroup>
                  </CCol>
                  <CCol className="col-md-6">
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilBirthdayCake} />
                      </CInputGroupText>
                      <CFormInput type="date" />
                    </CInputGroup>
                  </CCol>
                </CRow>
                <CCol className="col-md-12">
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLocationPin} />
                    </CInputGroupText>
                    <CFormInput placeholder="Home Address" autoComplete="homeAddress" />
                  </CInputGroup>
                </CCol>
                <CCol className="text-divider">Condo Unit Information</CCol>
                <CRow className="row">
                  <CCol className="col-md-6">
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilIndustry} />
                      </CInputGroupText>
                      <CFormInput placeholder="Unit Number" autoComplete="unitNum" />
                    </CInputGroup>
                  </CCol>
                  <CCol className="col-md-6">
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Unit Owner" autoComplete="unitOwner" />
                    </CInputGroup>
                  </CCol>
                </CRow>
                <CRow className="row">
                  <CCol className="col-md-12">
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <p className="dateVisit">Date of Visit</p>
                      </CInputGroupText>
                      <CFormInput type="date" />
                    </CInputGroup>
                  </CCol>
                </CRow>
                <CCol className="create-acc">
                  <CButton color="primary">Request Visit</CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Register
