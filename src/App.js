import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AdminLayout from "./layout/AdminLayout";
import TenantsLayout from "./layout/TenantsLayout";
import UnitOwnerLayout from "./layout/UnitOwnerLayout";
import SecurityGuardLayout from "./layout/SecurityGuardLayout";
import "./scss/style.scss";
import RequireAuth from "./components/RequireAuth";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Homepage = React.lazy(() => import("./views/pages/homepage/Homepage"));
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));


// SUPER ADMIN ------------------------------------------------------------------------------------------------------------------------------------------
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

//Billings
const WaterBillList = React.lazy(() => import('./views/superadmin/billings/WaterBillList'))
const AssocDueList = React.lazy(() => import('./views/superadmin/billings/AssocDueList'))
const ManageBilling = React.lazy(() => import('./views/superadmin/billings/ManageBilling'))
const AddBill = React.lazy(() => import('./views/superadmin/billings/AddBill'))
const MainInvoice = React.lazy(() => import('./views/superadmin/billings/MainInvoice'))

//Unit
const CondoUnitList = React.lazy(() => import('./views/superadmin/unit/CondoUnitList'))

//User
const UserList = React.lazy(() => import('./views/superadmin/user/UserList'))

//Request
const RequestList = React.lazy(() => import('./views/superadmin/request/RequestList'))
const PullOut = React.lazy(() => import('./views/superadmin/request/PullOut'))
const AccessPermit = React.lazy(() => import('./views/superadmin/request/AccessPermit'))

//Guest
const GuestList = React.lazy(() => import('./views/superadmin/guest/GuestList'))

//Admin
const AddNewAdminUser = React.lazy(() => import('./views/superadmin/admin/AddNewAdminUser'))
const AdminList = React.lazy(() => import('./views/superadmin/admin/AdminList'))
const AdminPriv = React.lazy(() => import('./views/superadmin/admin/AdminPriv'))

//Services
const ServiceList = React.lazy(() => import('./views/superadmin/services/ServiceList'))

//Calendar Reminders
const CalendarReminders = React.lazy(() => import('./views/superadmin/calendar/CalendarReminders'))


// ADMIN TEAM -------------------------------------------------------------------------------------------------------------------------------------------
const Dashboard_adminteam = React.lazy(() =>
  import("./views/dashboard-adminteam/Dashboard_adminteam")
);
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


// TENANTS ----------------------------------------------------------------------------------------------------------------------------------------------
const Dashboard_tenants = React.lazy(() =>
  import("./views/dashboard-tenants/Dashboard_tenants")
);

//Billings
const SOA_tenants = React.lazy(() => import('./views/tenants/billings_tenants/SOA_tenants'))

//Calendar Reminders
const CalendarReminders_tenants = React.lazy(() => import('./views/tenants/calendar_tenants/CalendarReminders_tenants'))

//Request
const RequestVisit_tenants = React.lazy(() => import('./views/tenants/request_tenants/RequestVisit_tenants'))
const PullOut_tenants = React.lazy(() => import('./views/tenants/request_tenants/PullOut_tenants'))
const AccessPermit_tenants = React.lazy(() => import('./views/tenants/request_tenants/AccessPermit_tenants'))

//FAQ
const FAQ_tenants = React.lazy(() => import('./views/tenants/faq_tenants/FAQ_tenants'))


// UNIT OWNER -------------------------------------------------------------------------------------------------------------------------------------------
const Dashboard_unitowner = React.lazy(() =>
  import("./views/dashboard-unitowner/Dashboard_unitowner")
);

// Tenants List
const TenantsList = React.lazy(() => import('./views/unitowner/tenantslist/TenantsList'))

//Billings
const SOA_unitowner = React.lazy(() => import('./views/unitowner/billings_unitowner/SOA_unitowner'))

//Request
const RequestVisit_unitowner = React.lazy(() => import('./views/unitowner/request_unitowner/RequestVisit_unitowner'))
const PullOut_unitowner = React.lazy(() => import('./views/unitowner/request_unitowner/PullOut_unitowner'))
const AccessPermit_unitowner = React.lazy(() => import('./views/unitowner/request_unitowner/AccessPermit_unitowner'))

//Calendar Reminders
const CalendarReminders_unitowner = React.lazy(() => import('./views/unitowner/calendar_unitowner/CalendarReminders_unitowner'))

//FAQ
const FAQ_unitowner = React.lazy(() => import('./views/unitowner/faq_unitowner/FAQ_unitowner'))


// SECURITY GUARD ---------------------------------------------------------------------------------------------------------------------------------------
const Dashboard_secguard = React.lazy(() =>
  import("./views/dashboard-secguard/Dashboard_secguard")
);

// Reservation List
const ReservationList = React.lazy(() => import('./views/secguard/reservationlist/ReservationList'))

//Calendar Reminders
const CalendarReminders_secguard = React.lazy(() => import('./views/secguard/calendar_secguard/CalendarReminders_secguard'))

//FAQ
const FAQ_secguard = React.lazy(() => import('./views/secguard/faq_secguard/FAQ_secguard'))

const ROLES = {
  'SuperAdmin': 1,
  'Admin': 2,
  'Accounting': 3,
  'UnitOwner': 4,
  'Tenant': 5,
  'SecurityGuard': 6,
}
//<Route element={<RequireAuth allowedRoles={['1']} />}> </Route>
// <Route element={<RequireAuth allowedRoles={['2']} />}> </Route>
class App extends Component {
  render() {
    return (
      <Suspense fallback={loading}>
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/*Protected Routes*/}
          {/* SUPER ADMIN ROUTES ----------------------------------------------------------------------------------------------------------------- */}
          <Route element={<DefaultLayout />}>
            {/* <Route element={<RequireAuth allowedRoles={['Super Admin']} />}> */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/waterbilllist" element={<WaterBillList />} />
              <Route path="/assocduelist" element={<AssocDueList />} />
              <Route path="/managebilling" element={<ManageBilling />} />
              <Route path="/addbill" element={<AddBill />} />
              <Route path="/maininvoice" element={<MainInvoice />} />
              <Route path="/unitlist" element={<CondoUnitList />} />
              <Route path="/userlist" element={<UserList />} />
              <Route path="/requestlist" element={<RequestList />} />
              <Route path="/pullout" element={<PullOut />} />
              <Route path="/accesspermit" element={<AccessPermit />} />
              <Route path="/guestlist" element={<GuestList />} />
              <Route path="/servicelist" element={<ServiceList />} />
              <Route path="/adminlist" element={<AdminList />} />
              <Route path="/addadmin" element={<AddNewAdminUser />} />
              <Route path="/adminprivileges" element={<AdminPriv />} />
              <Route path="/calendarreminders" element={<CalendarReminders />} />
            {/* </Route> */}
          </Route>
          
          {/* ADMIN TEAM ROUTES ----------------------------------------------------------------------------------------------------------------- */}
          <Route element={<AdminLayout />}>
            <Route element={<RequireAuth allowedRoles={['Admin']} />}>
              <Route path="/admin" element={<Dashboard_adminteam />} />
              <Route path="/admin/waterbilllist" element={<WaterBillList_adminteam />} />
              <Route path="/admin/assocduelist" element={<AssocDueList_adminteam />} />
              <Route path="/admin/managebilling" element={<ManageBilling_adminteam />} />
              <Route path="/admin/unitlist" element={<CondoUnitList_adminteam />} />
              <Route path="/admin/userlist" element={<UserList_adminteam />} />
              <Route path="/admin/securitylist" element={<SecurityGuardList_adminteam />} />
              <Route path="/admin/requestlist" element={<RequestList_adminteam />} />
              <Route path="/admin/guestlist" element={<GuestList_adminteam />} />
              <Route path="/admin/servicelist" element={<ServiceList_adminteam />} />
            </Route>
          </Route>

          {/* TENANTS ROUTES -------------------------------------------------------------------------------------------------------------------- */}
          <Route element={<TenantsLayout />}>

            <Route path="/tenants" element={<Dashboard_tenants />} />
            <Route path="/tenants/soa_tenants" element={<SOA_tenants />} />
            <Route path="/tenants/requestvisit_tenants" element={<RequestVisit_tenants />} />
            <Route path="/tenants/pullout_tenants" element={<PullOut_tenants />} />
            <Route path="/tenants/accesspermit_tenants" element={<AccessPermit_tenants />} />
            <Route path="/tenants/calendarreminders_tenants" element={<CalendarReminders_tenants />} />
            <Route path="/tenants/faq_tenants" element={<FAQ_tenants />} />

          </Route>

          {/* UNIT OWNER ROUTES ----------------------------------------------------------------------------------------------------------------- */}
          <Route element={<UnitOwnerLayout />}>

            <Route path="/unitowner" element={<Dashboard_unitowner />} />
            <Route path="/unitowner/tenantslist" element={<TenantsList />} />
            <Route path="/unitowner/soa_unitowner" element={<SOA_unitowner />} />
            <Route path="/unitowner/requestvisit_unitowner" element={<RequestVisit_unitowner />} />
            <Route path="/unitowner/pullout_unitowner" element={<PullOut_unitowner />} />
            <Route path="/unitowner/accesspermit_unitowner" element={<AccessPermit_unitowner />} />
            <Route path="/unitowner/calendarreminders_unitowner" element={<CalendarReminders_unitowner />} />
            <Route path="/unitowner/faq_unitowner" element={<FAQ_unitowner />} />

          </Route>

            {/* UNIT OWNER ROUTES ----------------------------------------------------------------------------------------------------------------- */}
            <Route element={<SecurityGuardLayout />}>

              <Route path="/secguard" element={<Dashboard_secguard />} />
              <Route path="/secguard/reservationlist" element={<ReservationList />} />
              <Route path="/secguard/calendarreminders_secguard" element={<CalendarReminders_secguard />} />
              <Route path="/secguard/faq_secguard" element={<FAQ_secguard />} />

            </Route>
          
        </Routes>
      </Suspense>
    );
  }
}

export default App;
