import React from "react";
import { FaUsers } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col items-center mt-20 px-6 pb-12">
      {/* About Us Section */}
      <div className="text-center mb-14 max-w-4xl mx-auto">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          About Us
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          DFT Football Club has been dedicated to talent development since 2017,
          focusing on under-17 recruitment and first-division players.
        </p>
      </div>

      {/* Content Section with Flex Layout */}
      <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-6xl mx-auto gap-12 md:gap-16 px-6">
        {/* Left Section - Youth Development */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xs">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Youth Development</h3>
          <p className="text-base text-gray-600">
            We focus on structured recruitment and training for under-17 athletes, ensuring
            a bright future for the next generation of football stars.
          </p>
        </div>

        {/* Center Section - Community Focus */}
        <div className="w-[320px] h-[450px] sm:w-[400px] sm:h-[500px] rounded-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-700 text-white px-8 py-10 shadow-lg">
          <FaUsers className="text-5xl mb-6" />
          <h3 className="text-xl font-semibold mb-3 text-center">Community Focus</h3>
          <p className="text-sm text-center text-gray-200 leading-relaxed px-4">
            We are committed to engaging with the community, fostering local talent, and making a lasting impact.
          </p>
        </div>

        {/* Right Section - Professional Growth */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right max-w-xs">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Professional Growth</h3>
          <p className="text-base text-gray-600">
            Our programs prepare players for professional careers in football by providing coaching, mentorship, and exposure.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="w-full flex justify-center mt-14">
        <a
          href="#"
          className="px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-full shadow-md hover:bg-blue-600 transition duration-300"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
