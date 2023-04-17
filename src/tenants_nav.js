import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilMoney,
  cilCalendarCheck,
  cilItalic,
  cilDescription,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const tenants_nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/tenants',
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
    name: 'Statement of Account',
    to: '/tenants/soa_tenants',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },

  {
    component: CNavGroup,
    name: 'Request',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Request Visit Form',
        to: '/tenants/requestvisit_tenants',
      },
      {
        component: CNavItem,
        name: 'Pull Out Form',
        to: '/tenants/pullout_tenants',
      },
      {
        component: CNavItem,
        name: 'Access Permit',
        to: '/tenants/accesspermit_tenants',
      },
    ],
  },

  {
    component: CNavItem,
    name: 'Calendar Reminders',
    to: '/tenants/calendarreminders_tenants',
    icon: <CIcon icon={cilCalendarCheck} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'FAQ',
    to: '/tenants/faq_tenants',
    icon: <CIcon icon={cilItalic} customClassName="nav-icon" />,
  },
  
]

export default tenants_nav
