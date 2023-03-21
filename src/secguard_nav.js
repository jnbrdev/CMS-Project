import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilCalendarCheck,
  cilItalic,
  cilGroup,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const secguard_nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/secguard',
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
    name: 'Reservations',
    to: '/secguard/reservationlist',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Calendar Reminders',
    to: '/secguard/calendarreminders_secguard',
    icon: <CIcon icon={cilCalendarCheck} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'FAQ',
    to: '/secguard/faq_secguard',
    icon: <CIcon icon={cilItalic} customClassName="nav-icon" />,
  },
  
]

export default secguard_nav
