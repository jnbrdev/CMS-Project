import { Outlet } from "react-router-dom";
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
const Layout = () => {
  return (
    <main className="App">
      
      <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
          <Outlet />
        </div>
        <AppFooter />
      </div>
    </div>
    </main>
  );
};

export default Layout;
