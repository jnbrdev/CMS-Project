import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Dashboard_adminteam = React.lazy(() => import('./views/dashboard-adminteam/Dashboard_adminteam'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

// SUPER ADMIN ---------------------------------------------------------------------------------------------------------------------------------------

//Billings
const WaterBillList = React.lazy(() => import('./views/superadmin/billings/WaterBillList'))
const AssocDueList = React.lazy(() => import('./views/superadmin/billings/AssocDueList'))
const ManageBilling = React.lazy(() => import('./views/superadmin/billings/ManageBilling'))

//Unit
const CondoUnitList = React.lazy(() => import('./views/superadmin/unit/CondoUnitList'))

//User
const UserList = React.lazy(() => import('./views/superadmin/user/UserList'))

//Security
const SecurityGuardList = React.lazy(() => import('./views/superadmin/security/SecurityGuardList'))

//Request
const RequestList = React.lazy(() => import('./views/superadmin/request/RequestList'))

//Guest
const GuestList = React.lazy(() => import('./views/superadmin/guest/GuestList'))

//Admin
const AddNewAdminUser = React.lazy(() => import('./views/superadmin/admin/AddNewAdminUser'))
const AdminList = React.lazy(() => import('./views/superadmin/admin/AdminList'))
const AdminPriv = React.lazy(() => import('./views/superadmin/admin/AdminPriv'))

//Services
const ServiceList = React.lazy(() => import('./views/superadmin/services/ServiceList'))


// ADMIN TEAM ---------------------------------------------------------------------------------------------------------------------------------------

//Billings
const WaterBillList_adminteam = React.lazy(() => import('./views/adminteam/billings_adminteam/WaterBillList_adminteam'))
const AssocDueList_adminteam = React.lazy(() => import('./views/adminteam/billings_adminteam/AssocDueList_adminteam'))
const ManageBilling_adminteam = React.lazy(() => import('./views/adminteam/billings_adminteam/ManageBilling_adminteam'))

//Unit
const CondoUnitList_adminteam = React.lazy(() => import('./views/adminteam/unit_adminteam/CondoUnitList_adminteam'))

//User
const UserList_adminteam = React.lazy(() => import('./views/adminteam/user_adminteam/UserList_adminteam'))

//Security
const SecurityGuardList_adminteam = React.lazy(() => import('./views/adminteam/security_adminteam/SecurityGuardList_adminteam'))

//Request
const RequestList_adminteam = React.lazy(() => import('./views/adminteam/request_adminteam/RequestList_adminteam'))

//Guest
const GuestList_adminteam = React.lazy(() => import('./views/adminteam/guest_adminteam/GuestList_adminteam'))

//Services
const ServiceList_adminteam = React.lazy(() => import('./views/adminteam/services_adminteam/ServiceList_adminteam'))



const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  
  // SUPER ADMIN PATHS ---------------------------------------------------------------------------------------------------------------------------------------
  { path: '/homepage', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/superadmin/billings/waterbilllist', name: 'Water Bill List', element: WaterBillList },
  { path: '/superadmin/billings/managebill', name: 'Manage Billings', element: ManageBilling },
  { path: '/superadmin/billings/associationduelist', name: 'Association Due List', element: AssocDueList },
  { path: '/superadmin/requests/requestlist', name: 'Request List', element: RequestList },
  { path: '/superadmin/services/servicelist', name: 'Service List', element: ServiceList },
  { path: '/superadmin/units/condounitlist', name: 'View Unit Details', element: CondoUnitList },
  { path: '/superadmin/user/userlist', name: 'User List', element: UserList },
  { path: '/superadmin/security/securityguardlist', name: 'Security Guard List', element: SecurityGuardList },
  { path: '/superadmin/admin/adminlist', name: 'Admin List', element: AdminList },
  { path: '/superadmin/admin/addadmin', name: 'Add Admin User', element: AddNewAdminUser },
  { path: '/superadmin/admin/adminprivileges', name: 'Admin Privileges', element: AdminPriv },
  { path: '/superadmin/guest/guestlist', name: 'Guest List', element: GuestList },

   // ADMIN TEAM PATHS ---------------------------------------------------------------------------------------------------------------------------------------
  { path: '/homepage', exact: true, name: 'Home' },
  { path: '/dashboard_adminteam', name: 'Dashboard', element: Dashboard_adminteam },
  { path: '/adminteam/billings_adminteam/waterbilllist_adminteam', name: 'Water Bill List', element: WaterBillList_adminteam },
  { path: '/adminteam/billings_adminteam/managebill_adminteam', name: 'Manage Billings', element: ManageBilling_adminteam },
  { path: '/adminteam/billings_adminteam/associationduelist_adminteam', name: 'Association Due List', element: AssocDueList_adminteam },
  { path: '/adminteam/requests_adminteam/requestlist_adminteam', name: 'Request List', element: RequestList_adminteam },
  { path: '/adminteam/services_adminteam/servicelist_adminteam', name: 'Service List', element: ServiceList_adminteam },
  { path: '/adminteam/units_adminteam/condounitlist_adminteam', name: 'View Unit Details', element: CondoUnitList_adminteam },
  { path: '/adminteam/user_adminteam/userlist_adminteam', name: 'User List', element: UserList_adminteam },
  { path: '/adminteam/security_adminteam/securityguardlist_adminteam', name: 'Security Guard List', element: SecurityGuardList_adminteam },
  { path: '/adminteam/guest_adminteam/guestlist_adminteam', name: 'Guest List', element: GuestList_adminteam },
]

export default routes
