import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './components/nav/screen/Home';
function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default Router;
