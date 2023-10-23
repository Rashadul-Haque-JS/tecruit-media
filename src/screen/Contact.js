import React from "react";
const ContactPage = () => {
  return (
    <div className="min-h-screen pb-20">
        <h2 className="text-2xl 2xl:text-4xl 3xl:text-4xl 4xl:text-5xl font-semibold mb-2 text-center py-8 text-tecruitSecondary bg-tecruitPrimary">
         Reach Us
        </h2>
        
        <div className="flex flex-col justify-center items-center gap-10 sm:gap-6">
          <div className="w-1/2 sm:w-full text-centern md:px-0  p-10">
            <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
            <p className="text-gray-700">
              <strong>Address:</strong> 007 Regnbåge,
            </p>
            <p className="text-gray-700">
            190 00, Stockholm,
            </p>
            <p className="text-gray-700">
              Sweden
            </p>
            <p className="text-gray-700 py-2">
              <strong>Email:</strong> contact@tecruit.com
            </p>
            <p className="text-gray-700">
              <strong>Mobile:</strong> +46 (000) 0000-000
            </p>
            <p className="text-gray-700">
              <strong>Tel:</strong> +46 (080) 0000-000
            </p>
          </div>
          <div className="w-1/2 sm:w-full md:w-2/3 sm:px-2 p-10">
            <h2 className="text-xl font-semibold mb-2 sm:px-8">Send Us a Message</h2>
            <form className="shadow-lg p-8 mt-2">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-600 font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 font-semibold hover:shadow-md transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    
  );
};

export default ContactPage;
