import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
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
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Dashboard_adminteam = React.lazy(() =>
  import("./views/dashboard-adminteam/Dashboard_adminteam")
);
const WaterBillList = React.lazy(() =>
  import("./views/superadmin/billings/WaterBillList")
);

class App extends Component {
  render() {
    return (
      <Suspense fallback={loading}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/*Protected Routes*/}
          <Route element={<RequireAuth allowedRoles={["Super Admin"]} />}>
            <Route path="/" element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
            <Route path="/" element={<Layout />}>
              <Route path="/home" element={<Dashboard_adminteam />} />
              <Route path="/waterbilllist" element={<WaterBillList />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    );
  }
}

export default App;
