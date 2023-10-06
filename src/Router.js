import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './screen/Home';
import JobSearch from './screen/JobSearch';
function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobSearch />} />
      </Routes>
    </div>
  );
}

export default Router;
