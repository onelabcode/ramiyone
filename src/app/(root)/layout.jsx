"use client";
import Navbar from "../../components/feature/Navbar";
import Footer from "../../components/feature/Footer";
const layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default layout;
