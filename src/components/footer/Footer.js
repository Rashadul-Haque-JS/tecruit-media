import React from "react";
import SubscribeForm from "./Subscribe";

const Footer = () => {
  return (
    <>
      <SubscribeForm />
      <div className="bg-[#faf9f5] pt-10 pb-20 px-10 sm:px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="sm:col-span-1">
              <h3 className="text-xl font-semibold">Become a Member</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="/meberships">Choose a Membership</a>
                </li>
                <li>
                  <a href="/applicant-membership">Personal Membership</a>
                </li>
                <li>
                  <a href="/company-membership">Organisation Membership</a>
                </li>
                <li>
                  <a href="/students">Student Membership</a>
                </li>
              </ul>
            </div>
            <div className="sm:col-span-1">
              <h3 className="text-xl font-semibold">News</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="/tech-news">News</a>
                </li>
                <li>
                  <a href="/feedback">Reviews & Opinions</a>
                </li>
                <li>
                  <a href="/arts-job">Series: So you want my arts job?</a>
                </li>
                <li>
                  <a href="/podcasts">Podcast: The TechTalks</a>
                </li>
                <li>
                  <a href="/newsletter-subscription">
                    Subscribe to Newsletters
                  </a>
                </li>
              </ul>
            </div>
            <div className="sm:col-span-1">
              <h3 className="text-xl font-semibold">Advertising</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="/job-ads">Job Advertising</a>
                </li>
                <li>
                  <a href="/sponsors">Display & Sponsored</a>
                </li>
                <li>
                  <a href="event-ads">Event Advertising</a>
                </li>
                <li>
                  <a href="/ads-offer">Opportunity Advertising</a>
                </li>
                <li>
                  <a href="/ads">Grant Advertising</a>
                </li>
                <li>
                  <a href="/courses-catalogue">Course Catalogue</a>
                </li>
              </ul>
            </div>
            <div className="csm:col-span-1 ">
              <h3 className="text-xl font-semibold">Member Support</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="/profile">My Profile</a>
                </li>
                <li>
                  <a href="/forgot-password">Forgot My Password</a>
                </li>
                <li>
                  <a href="/news-letter-pref">Newsletter Preferences</a>
                </li>
                <li>
                  <a href="/member-dashboard">Member Dashboard</a>
                </li>
              </ul>
            </div>
            <div className="csm:col-span-1 ">
              <h3 className="text-xl font-semibold">Others</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="/tecruit">About</a>
                </li>
                <li>
                  <a href="/contact">Conatct</a>
                </li>
                <li>
                  <a href="/career">Tecruit Career</a>
                </li>
              </ul>
            </div>
          </div>
        
        </div>
      </div>
    </>
  );
};

export default Footer;
