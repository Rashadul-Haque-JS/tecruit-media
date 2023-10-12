import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Router";
import Navbar from "./components/nav/Navbar";
import Footer from "./components/footer/Footer";



function App() {

  return (
    <BrowserRouter>
        <Navbar/>
        <div className="min-h-screen">
          <AppRoutes />
        </div>
        <Footer/>
     
    </BrowserRouter>
  );
}

export default App;