import React from "react";
import DashNavbar from "../../components/feature/comp_dashboard/DashNavbar";
const layout = ({ children }) => {
  return (
    <>
      <DashNavbar />
      <div>{children}</div>
    </>
  );
};

export default layout;
