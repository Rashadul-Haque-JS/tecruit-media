import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from '../screen/Home';
import JobSearch from '../screen/jobs/JobSearch';
import PostJob from '../screen/jobs/JobPost';
import CompanyList from '../screen/ITCompanies';
import AuthView from '../screen/auth/Auth';
import JobsMatchWithCV from '../screen/jobs/JobsMatchedWithCV';
import NotFoundPage from "../screen/PageNotFound";
import AboutTecruit from '../screen/about';
import ContactPage from '../screen/Contact';
import UserProfile from '../screen/auth/UserProfile';
import EditJob from '../screen/jobs/JobEdit';

const Router=()=>{
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthView />} />
        <Route path="/:location/jobs" element={<JobSearch />} />
        <Route path="/:location/post-job" element={<PostJob />} />
        <Route path="/:location/it-companies" element={<CompanyList />} />
        <Route path="/:location/jobs-match" element={<JobsMatchWithCV />} />
        <Route path="/:location/:company/jobs/:id/edit" element={<EditJob />} />
        <Route path="/tecruit" element={<AboutTecruit />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default Router;
