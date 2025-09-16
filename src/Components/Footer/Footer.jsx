import React from 'react'
import image1 from '../../assets/amazon-pay.png'
import image2 from '../../assets/American-Express-Color.png'
import image3 from '../../assets/mastercard.webp'
import image4 from '../../assets/paypal.png'
import image5 from '../../assets/get-apple-store.png'
import image6 from '../../assets/get-google-play.png'

export default function Footer() {
  return (
    <footer className="bg-mainlight py-10 mt-10 dark:bg-slate-800 ">
      <div className="container space-y-5">
        {/* Header */}
        <div>
          <h1 className="text-darkPrimary font-bold text-2xl">
            Get the FreshCart App
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            We will send you a link, open it on your phone to download the app
          </p>
        </div>

        {/* Input and Button */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Email...."
            className="dark:bg-slate-600 text-gray-200 focus:text-darkPrimary placeholder:text-gray-400 px-2 py-2 focus:outline-none border border-gray-300 bg-white rounded-md w-full sm:w-auto flex-1"
          />
          <button className="bg-primary text-white px-5 py-2 rounded-lg w-full sm:w-auto">
            Share App Link
          </button>
        </div>

        {/* Payments & Apps */}
        <div className="border-t border-b py-4 border-gray-200 flex flex-col lg:flex-row justify-between items-center gap-4">
          {/* Payment Partners */}
          <div className="flex flex-wrap gap-3 items-center justify-center lg:justify-start">
            <h3 className="text-darkPrimary text-md w-full lg:w-auto text-center lg:text-left">Payment Partners</h3>
            <img className="w-16" src={image1} alt="" />
            <img className="w-16" src={image2} alt="" />
            <img className="w-16" src={image3} alt="" />
            <img className="w-16" src={image4} alt="" />
          </div>

          {/* App Store Links */}
          <div className="flex flex-wrap gap-3 items-center justify-center lg:justify-end">
            <h3 className="text-darkPrimary text-md w-full lg:w-auto text-center lg:text-left">Get deliveries with FreshCart</h3>
            <img className="w-28" src={image5} alt="" />
            <img className="w-28" src={image6} alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
}
