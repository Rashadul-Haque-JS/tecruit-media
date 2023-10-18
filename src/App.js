import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Router";
import Navbar from "./components/nav/Navbar";
import Footer from "./components/footer/Footer";
import { useSelector } from "react-redux";
import OverleyComponent from "./components/common/overlay";
import CurrentLocation from "./components/common/CurrentLocation";

function App() {
  const isDrawerOpen = useSelector((state) => state.common.isDrawerOpen);

  return (
    <BrowserRouter>
        <Navbar/>
        <CurrentLocation/>
        <div className="min-h-screen relative">
          <AppRoutes />
          <OverleyComponent open={isDrawerOpen} />
        </div>
        <Footer/>
     
    </BrowserRouter>
  );
}

export default App;