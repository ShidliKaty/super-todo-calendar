import { Suspense } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="content-page">
      <Sidebar />
      <Suspense fallback="">
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
