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
    to: '/admin',
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
        to: '/admin/waterbilllist',
      },
      {
        component: CNavItem,
        name: 'Association Due List',
        to: '/admin/assocduelist',
      },
      {
        component: CNavItem,
        name: 'Manage Billings',
        to: '/admin/managebilling',
      },
    ],
  },

  {
    component: CNavItem,
    name: 'Requests',
    to: '/admin/requestlist',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Services',
    to: '/admin/servicelist',
    icon: <CIcon icon={cilPool} customClassName="nav-icon" />,
  },
  
  {
    component: CNavItem,
    name: 'Units',
    to: '/admin/unitlist',
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Users',
    to: '/admin/userlist',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Security Guards',
    to: '/admin/securitylist',
    icon: <CIcon icon={cilShieldAlt} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Guest',
    to: '/admin/guestlist',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  },
]

export default adminteam_nav
