import React from 'react';

const OtpPage = () => {
  return (
    <div className="flex min-h-screen pt-5">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center py-8 md:px-28">
        {/* Logo */}
        <div className="text-3xl font-bold text-gray-800 mb-8">
          <span className="text-blue-500">R</span>am<span className="text-blue-500">Y</span>one
        </div>

        {/* OTP Verification Section */}
        <h1 className="text-2xl font-semibold mb-4 text-gray-700">OTP Verification</h1>
        <p className="text-gray-500 mb-8 text-center">
          We will send you an <span className="font-bold text-black">One Time Password</span> on this mobile phone
        </p>

        {/* Fingerprint Icon */}
        <div className="my-8">
          <img
            src="https://via.placeholder.com/60" // Placeholder image URL
            alt="Fingerprint"
            width={60}
            height={60}
          />
        </div>

        {/* Phone Input */}
        <div className="w-full max-w-md mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="phone">Phone *</label>
          <input
            type="text"
            id="phone"
            placeholder="09********"
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
          />
        </div>

        {/* Get OTP Button */}
        <button className="w-full max-w-md py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium mb-6">
          Get OTP
        </button>

        {/* Back to Login */}
        <p className="text-gray-500 text-sm">
          <a href="#" className="hover:underline text-gray-900 hover:text-blue-600">Back to Login</a>
        </p>
      </div>

      {/* Right Side with Background */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-400 to-blue-700 rounded-lg my-8 mx-14">
        
      </div>
    </div>
  );
};

export default OtpPage;
