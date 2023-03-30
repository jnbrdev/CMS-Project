import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilMoney,
  cilCalendarCheck,
  cilItalic,
  cilGroup,
  cilDescription,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const unitowner_nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/unitowner',
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
    component: CNavItem,
    name: 'Tenants',
    to: '/unitowner/tenantslist',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },

  {
    component: CNavGroup,
    name: 'Billings',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Water Bills',
        to: '/unitowner/waterbills_unitowner',
      },
      {
        component: CNavItem,
        name: 'Association Dues',
        to: '/unitowner/assocdues_unitowner',
      },
      // {
      //   component: CNavItem,
      //   name: 'Manage Billings',
      //   to: '/unitowner/managebilling',
      // },
    ],
  },

  {
    component: CNavGroup,
    name: 'Request',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Request Visit Form',
        to: '/unitowner/requestvisit_unitowner',
      },
      {
        component: CNavItem,
        name: 'Pull Out Form',
        to: '/unitowner/pullout_unitowner',
      },
      {
        component: CNavItem,
        name: 'Access Permit',
        to: '/unitowner/accesspermit_unitowner',
      },
    ],
  },

  {
    component: CNavItem,
    name: 'Calendar Reminders',
    to: '/unitowner/calendarreminders_unitowner',
    icon: <CIcon icon={cilCalendarCheck} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'FAQ',
    to: '/unitowner/faq_unitowner',
    icon: <CIcon icon={cilItalic} customClassName="nav-icon" />,
  },
  
]

export default unitowner_nav
