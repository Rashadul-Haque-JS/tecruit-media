import React from "react";
import SubscribeForm from "./Subscribe";


const Footer = () => {
  return (
    <>
    <SubscribeForm/>
    <div className="bg-[#faf9f5] pt-10 pb-20 px-10 sm:px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="sm:col-span-1">
            <h3 className="text-xl font-semibold">Become a Member</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="https://www.example.com/membership/">Choose a Membership</a>
              </li>
              <li>
                <a href="https://www.example.com/personal-membership/">Personal Membership</a>
              </li>
              <li>
                <a href="https://www.example.com/organisation-membership/">Organisation Membership</a>
              </li>
              <li>
                <a href="https://www.example.com/member/registration/student/step/1/">Student Membership</a>
              </li>
            </ul>
          </div>
          <div className="sm:col-span-1">
            <h3 className="text-xl font-semibold">News</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="https://www.example.com/news/">News</a>
              </li>
              <li>
                <a href="https://www.example.com/reviews-opinions/">Reviews & Opinions</a>
              </li>
              <li>
                <a href="https://www.example.com/tag/so-you-want-my-arts-job/">Series: So you want my arts job?</a>
              </li>
              <li>
                <a href="https://www.example.com/artshubbub/">Podcast: The ArtsHubbub</a>
              </li>
              <li>
                <a href="https://www.example.com/subscribe-artshub-australia-newsletters/">Subscribe to Newsletters</a>
              </li>
            </ul>
          </div>
          <div className="sm:col-span-1">
            <h3 className="text-xl font-semibold">Advertising</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="https://www.example.com/advertise-jobs/">Job Advertising</a>
              </li>
              <li>
                <a href="https://www.example.com/advertise/">Display & Sponsored</a>
              </li>
              <li>
                <a href="https://www.example.com/advertise-events">Event Advertising</a>
              </li>
              <li>
                <a href="https://www.example.com/opportunity/add/packages/">Opportunity Advertising</a>
              </li>
              <li>
                <a href="https://www.example.com/grant/add/packages/">Grant Advertising</a>
              </li>
              <li>
                <a href="https://www.example.com/course/add/packages/">Course Advertising</a>
              </li>
            </ul>
          </div>
          <div className="csm:col-span-1 ">
            <h3 className="text-xl font-semibold">Member Support</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="https://www.example.com/member/account/">My Account</a>
              </li>
              <li>
                <a href="https://www.example.com/wp-login.php?action=lostpassword">Forgot My Password</a>
              </li>
              <li>
                <a href="https://www.example.com/member/newsletter/">Newsletter Preferences</a>
              </li>
              <li>
                <a href="https://www.example.com/member/dashboard/">Member Dashboard</a>
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
