import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/Router";
import Navbar from "./components/nav/Navbar";
import Footer from "./components/footer/Footer";
import OverleyComponent from "./components/common/overlay";
import CurrentLocation from "./components/common/CurrentLocation";
import { useSelector } from "react-redux";
import CookieBanner from "./components/Cookie";
function App() {
  const isDrawerOpen = useSelector((state) => state.common.isDrawerOpen);
  const isCookieAccepted = useSelector((state) => state.common.cookieAccepted);
  return (
    <BrowserRouter>
    
        <Navbar />
        <CurrentLocation />
        <div className="min-h-screen relative">
          <AppRoutes />
          <OverleyComponent open={isDrawerOpen} />
        </div>
        <Footer />
        <CookieBanner />
        {!isCookieAccepted && (
          <div className="fixed inset-0 bg-transparent w-full h-full z-40"></div>
        )}{" "}
      
    </BrowserRouter>
  );
}

export default App;
