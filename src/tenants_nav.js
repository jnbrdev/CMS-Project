import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilMoney,
  cilCalendarCheck,
  cilItalic,
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
    component: CNavGroup,
    name: 'Billings',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Water Bills',
        to: '/tenants/waterbills_tenants',
      },
      {
        component: CNavItem,
        name: 'Association Dues',
        to: '/tenants/assocdues_tenants',
      },
      // {
      //   component: CNavItem,
      //   name: 'Manage Billings',
      //   to: '/tenants/managebilling',
      // },
    ],
  },

  {
    component: CNavGroup,
    name: 'Request',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
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
      // {
      //   component: CNavItem,
      //   name: 'Manage Billings',
      //   to: '/tenants/managebilling',
      // },
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
