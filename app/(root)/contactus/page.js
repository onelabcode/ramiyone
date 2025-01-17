import React from "react";
import { FaPhone ,FaVoicemail} from "react-icons/fa";
import { MdLocationCity} from "react-icons/md";
const page = () => {
  return (
    <>
     <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-12">
  
      <div className="flex flex-col lg:w-1/2">
        <div className="flex gap-5 mb-6">
          <div className="h-50 lg:w-10 w-38 bg-blue-600 rounded-lg flex justify-center items-center"></div>
       <div className="flex flex-col space-y-6">
       <h2 className="text-3xl font-bold text-gray-800">
          Let’s stay connected
        </h2>
        <p className="text-gray-500">
          It's never been easier to get in touch with RamiYoneCall. Use our
          live chat widget or email, and we’ll get back to you as soon as
          possible!
        </p>
       </div>
        </div>
        <div className="flex flex-row gap-10 my-10">
     
          <div className="flex flex-col justify-center gap-5">
          <div className="flex items-center space-x-5 text-gray-600 gap-4">
            <span className="material-icons text-blue-500"><FaPhone size={35}/></span>
            <span className="font-semibold text-sm">0987654321</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600 gap-4">
            <span className="material-icons text-blue-500"><FaVoicemail size={35}/></span>
            <span className="font-semibold text-sm">RamiYone.com</span>
          </div>
          </div>
          <div className="flex items-center space-x-3 text-gray-600 gap-4">
            <span className="material-icons text-blue-500"><MdLocationCity size={35}/></span>
            <span className="font-semibold text-sm">
              Ayertensa, Zewditu Building, 1st floor, office no 79, Addis Ababa, Ethiopia
            </span>
          </div>
        </div>
      </div>

     
      <div className="lg:w-1/2 mt-10 lg:mt-0 p-8 w-full max-w-md">
        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@gmail.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 mb-2 font-semibold">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full border max-h-28 border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-2xl py-2 font-semibold hover:bg-blue-600 transition duration-200"
          >
            Send
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default page;
