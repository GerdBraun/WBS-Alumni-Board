import { Outlet } from "react-router-dom";
import ContextProvider from "../../context/ContextProvider";
import Footer from "../parts/Footer";
import Header from "../parts/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <ContextProvider>
      <Header />
      <div className="container mx-auto">
        <Outlet />
        </div>
      <Footer />
      <ToastContainer />
    </ContextProvider>
  );
};

export default Layout;
