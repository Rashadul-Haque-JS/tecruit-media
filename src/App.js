import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Router";
import Navbar from "./components/nav/Navbar";



function App() {

  return (
    <BrowserRouter>
        <Navbar/>
        <div className="min-h-screen">
          <AppRoutes />
        </div>
     
    </BrowserRouter>
  );
}

export default App;