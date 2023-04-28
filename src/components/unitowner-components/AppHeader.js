import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import useAuth from "src/hooks/useAuth";
import { useState, useEffect } from 'react';
import axios from "src/api/axios";
import SOA_unitowner from "src/views/unitowner/billings_unitowner/SOA_unitowner"

const USER_BALANCE_URL = "/users/getUserBalance/";
const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const {auth} = useAuth()
  const [userBalance, setUserBalance] = useState();
  useEffect(() => {
    const email = auth?.email //get user logged in email in the auth state
    axios.get(`${USER_BALANCE_URL}${email}`).then((response) => {
      setUserBalance(response.data);
    });
  }, [userBalance]);


  return (
    <CHeader position="sticky" className="mb-4">
      
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CFormLabel>
              Logged in As: {auth?.full_name}
              <br/>
              Account Balance: ₱{userBalance}
            </CFormLabel>
          </CNavItem>
          <CNavItem>
          <CFormLabel>
              
            </CFormLabel>
          </CNavItem>
          <CNavItem>
            
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
