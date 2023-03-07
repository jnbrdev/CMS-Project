import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  //cilCalculator,
  //cilChartPie,
  //cilCursor,
  cilDescription,
  //cilDrop,
  // cilNotes,
  //cilPencil,
  //cilPuzzle,
  cilSpeedometer,
  //cilStar,
  cilMoney,
  cilPool,
  cilHouse,
  cilUser,
  cilPeople,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
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
  /*{
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Typography',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },*/
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
        to: '/billings/waterbilllist',
      },
      {
        component: CNavItem,
        name: 'Association Due List',
        to: '/billings/associationduelist',
      },
      {
        component: CNavItem,
        name: 'Manage Billings',
        to: '/billings/managebill',
      },
      {
        component: CNavItem,
        name: 'Add Billing',
        to: '/billings/addbilling',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Requests',
    to: '/requests',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Request List',
        to: '/requests/requestlist',
      },
      {
        component: CNavItem,
        name: 'Request Approval',
        to: '/requests/requestapproval',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Services',
    icon: <CIcon icon={cilPool} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Service List',
        to: '/services/servicelist',
      },
      {
        component: CNavItem,
        name: 'AddNewService',
        to: '/services/addservice',
      },
    ],
  },
  /*{
    component: CNavItem,
    name: 'Charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },*/
  {
    component: CNavGroup,
    name: 'Units',
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Unit List',
        to: '/units/unitlist',
      },
      {
        component: CNavItem,
        name: 'Add Unit',
        to: '/units/addunit',
      },
      {
        component: CNavItem,
        name: 'View Unit Details',
        to: '/units/unitdetails',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'User',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'User List',
        to: '/user/userlist',
      },
      {
        component: CNavItem,
        name: 'Add User',
        to: '/user/adduser',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Admin Management',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Admin List',
        to: '/admin/adminlist',
      },
      {
        component: CNavItem,
        name: 'Add Admin User',
        to: '/admin/addadmin',
      },
      {
        component: CNavItem,
        name: 'Admin Privileges',
        to: '/admin/adminprivileges',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Guest',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Guest List',
        to: '/guest/guestlist',
      },
      {
        component: CNavItem,
        name: 'Add Guest',
        to: '/guest/addguest',
      },
      {
        component: CNavItem,
        name: 'Guest Approval',
        to: '/guest/guestapproval',
      },
    ],
  },
  /*{ // ForReference
    component: CNavItem,
    name: 'Widgets',
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },*/
]

export default _nav
