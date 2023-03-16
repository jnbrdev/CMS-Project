import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AdminLayout from "./layout/AdminLayout";
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
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

// SUPER ADMIN ----------------------------------------------------------
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

//Billings
const WaterBillList = React.lazy(() => import('./views/superadmin/billings/WaterBillList'))
const AssocDueList = React.lazy(() => import('./views/superadmin/billings/AssocDueList'))
const ManageBilling = React.lazy(() => import('./views/superadmin/billings/ManageBilling'))
const AddBilling = React.lazy(() => import('./views/superadmin/billings/AddBilling'))

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




// ADMIN TEAM --------------------------------------------------------------------------
const Dashboard_adminteam = React.lazy(() =>
  import("./views/dashboard-adminteam/Dashboard_adminteam")
);
//Billings
const WaterBillList_adminteam = React.lazy(() => import('./views/adminteam/billings_adminteam/WaterBillList_adminteam'))
const AssocDueList_adminteam = React.lazy(() => import('./views/adminteam/billings_adminteam/AssocDueList_adminteam'))
const ManageBilling_adminteam = React.lazy(() => import('./views/adminteam/billings_adminteam/ManageBilling_adminteam'))
const AddBilling_adminteam = React.lazy(() => import('./views/adminteam/billings_adminteam/AddBilling_adminteam'))

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


const ROLES = {
  'SuperAdmin': 1,
  'Admin': 2,
  'Accounting': 3,
  'UnitOwner': 4,
  'Tenant': 5,
  'SecurityGuard': 6,
}

class App extends Component {
  render() {
    return (
      <Suspense fallback={loading}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/*Protected Routes*/}
          
          <Route element={<DefaultLayout />}>
              <Route element={<RequireAuth allowedRoles={['1']} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/waterbilllist" element={<WaterBillList />} />
              <Route path="/assocduelist" element={<AssocDueList />} />
              <Route path="/managebilling" element={<ManageBilling />} />
              <Route path="/addbilling" element={<AddBilling />} />
              <Route path="/unitlist" element={<CondoUnitList />} />
              <Route path="/userlist" element={<UserList />} />
              <Route path="/securitylist" element={<SecurityGuardList />} />
              <Route path="/requestlist" element={<RequestList />} />
              <Route path="/guestlist" element={<GuestList />} />
              <Route path="/servicelist" element={<ServiceList />} />
              <Route path="/adminlist" element={<AdminList />} />
              <Route path="/addadmin" element={<AddNewAdminUser />} />
              <Route path="/adminprivileges" element={<AdminPriv />} />
            </Route>
          </Route>
          <Route element={<AdminLayout />}>
              <Route element={<RequireAuth allowedRoles={['2']} />}>
              <Route path="/admin" element={<Dashboard_adminteam />} />
              <Route path="/admin/waterbilllist" element={<WaterBillList_adminteam />} />
              <Route path="/admin/assocduelist" element={<AssocDueList_adminteam />} />
              <Route path="/admin/managebilling" element={<ManageBilling_adminteam />} />
              <Route path="/admin/addbilling" element={<AddBilling_adminteam />} />
              <Route path="/admin/unitlist" element={<CondoUnitList_adminteam />} />
              <Route path="/admin/userlist" element={<UserList_adminteam />} />
              <Route path="/admin/securitylist" element={<SecurityGuardList_adminteam />} />
              <Route path="/admin/requestlist" element={<RequestList_adminteam />} />
              <Route path="/admin/guestlist" element={<GuestList_adminteam />} />
              <Route path="/admin/servicelist" element={<ServiceList_adminteam />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    );
  }
}

export default App;
