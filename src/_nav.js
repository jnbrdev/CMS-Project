import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  //cilCalculator,
  //cilChartPie,
  //cilCursor,
  cilShieldAlt,
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
        to: '/superadmin/billings/waterbilllist',
      },
      {
        component: CNavItem,
        name: 'Association Due List',
        to: '/superadmin/billings/associationduelist',
      },
      {
        component: CNavItem,
        name: 'Manage Billings',
        to: '/superadmin/billings/managebill',
      },
      {
        component: CNavItem,
        name: 'Add Billing',
        to: '/superadmin/billings/addbilling',
      },
    ],
  },

  {
    component: CNavItem,
    name: 'Requests',
    to: '/superadmin/requests/requestlist',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Services',
    to: '/superadmin/services/servicelist',
    icon: <CIcon icon={cilPool} customClassName="nav-icon" />,
  },
  /*{
    component: CNavItem,
    name: 'Charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },*/
  {
    component: CNavItem,
    name: 'Units',
    to: '/superadmin/units/condounitlist',
    icon: <CIcon icon={cilHouse} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Users',
    to: '/superadmin/user/userlist',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Security Guards',
    to: '/superadmin/security/securityguardlist',
    icon: <CIcon icon={cilShieldAlt} customClassName="nav-icon" />,
  },

  {
    component: CNavGroup,
    name: 'Admin Management',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Admin List',
        to: '/superadmin/admin/adminlist',
      },
      {
        component: CNavItem,
        name: 'Add Admin User',
        to: '/superadmin/admin/addadmin',
      },
      {
        component: CNavItem,
        name: 'Admin Privileges',
        to: '/superadmin/admin/adminprivileges',
      },
    ],
  },

  {
    component: CNavItem,
    name: 'Guest',
    to: '/superadmin/guest/guestlist',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
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
