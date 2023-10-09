import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './screen/Home';
import JobSearch from './screen/JobSearch';
import PostJob from './screen/JobPost';
import CompanyList from './screen/Companies';
function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobSearch />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/it-companies" element={<CompanyList />} />
      </Routes>
    </div>
  );
}

export default Router;
