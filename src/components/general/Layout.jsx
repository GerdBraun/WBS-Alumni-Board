import { Outlet } from "react-router-dom";
import ContextProvider from "../../context/ContextProvider";
import Footer from "../parts/Footer";
import Header from "../parts/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LocalStorageLoader from "../authentication/LocalStorageLoader";

const Layout = () => {
  return (
    <ContextProvider>
      <LocalStorageLoader />
      <Header />
      <div className="container mx-auto">
        <main className="pt-24">
          <Outlet />
        </main>
      </div>
      <Footer />
      <ToastContainer />
    </ContextProvider>
  );
};

export default Layout;
