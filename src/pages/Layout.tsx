import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../entities/Sidebar";

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
