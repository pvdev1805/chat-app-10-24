import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import { Outlet } from "react-router-dom";
import "./LayoutDefault.css";

const LayoutDefault = () => {
  return (
    <>
      <Header />

      <main className="bg-image p-4 flex items-center justify-center">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default LayoutDefault;
