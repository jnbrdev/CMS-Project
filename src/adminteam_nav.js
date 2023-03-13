import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilShieldAlt,
  cilDescription,
  cilSpeedometer,
  cilMoney,
  cilPool,
  cilHouse,
  cilPeople,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const adminteam_nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Features',
  },
  {
    component: CNavGroup,
    name: 'Billings',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Water Bill List',
        to: '/adminteam/billings_adminteam/waterbilllist_adminteam',
      },
      {
        component: CNavItem,
        name: 'Association Due List',
        to: '/adminteam/billings_adminteam/associationduelist_adminteam',
      },
      {
        component: CNavItem,
        name: 'Manage Billings',
        to: '/adminteam/billings_adminteam/managebill_adminteam',
      },
      {
        component: CNavItem,
        name: 'Add Billing',
        to: '/adminteam/billings_adminteam/addbilling_adminteam',
      },
    ],
  },

  {
    component: CNavItem,
    name: 'Requests',
    to: '/adminteam/requests_adminteam/requestlist_adminteam',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Services',
    to: '/adminteam/services_adminteam/servicelist_adminteam',
    icon: <CIcon icon={cilPool} customClassName="nav-icon" />,
  },
  
  {
    component: CNavItem,
    name: 'Units',
    to: '/adminteam/units_adminteam/condounitlist_adminteam',
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Users',
    to: '/adminteam/user_adminteam/userlist_adminteam',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Security Guards',
    to: '/adminteam/security_adminteam/securityguardlist_adminteam',
    icon: <CIcon icon={cilShieldAlt} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Guest',
    to: '/adminteam/guest_adminteam/guestlist_adminteam',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  },
]

export default adminteam_nav
