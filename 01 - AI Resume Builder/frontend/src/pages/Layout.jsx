import React from "react";
import ResumeBuilder from "./ResumeBuilder";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      Layout
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
