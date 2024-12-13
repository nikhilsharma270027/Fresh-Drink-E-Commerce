// import React from 'react'
import { useNavigate } from 'react-router-dom';
import Styles from '../styles/navbar.module.css'
import Strap from './Strap';
const Productframe = () => {
  const navigate = useNavigate();
  return (
    <>
      <Strap />

      <div className="h-[35rem] flex flex-col-reverse lg:flex-row items-center justify-between border-2 border-black overflow-hidden bg-[#68f0d7]">
        <div className="w-full lg:w-1/2 text-center mx-5 my-5">
          <h1 className="font-bold text-balance px-12 ">
            Fresh, fun & full of flavour
          </h1>
          <i className="text-3xl">kombucha with a twist !</i>
          <br />
          <div className={Styles.shopBox} onClick={()=> navigate('/product')}>
            Shop
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            className="bg-[#68f1d7] max-w-md  md:aspect-auto overflow-hidden object-cover"
            src="/fresh-banner-1.png"
            alt="3 fresh drink"
          />
        </div>
      </div>



      <div className="marquee h-20 text-black bg-[#bd5aeb] border-b-black border-b-2">
        <div className="marquee-content m-4 text-5xl font-extrabold">
          FREE SHIPPING ON ALL ORDERS!! FREE SHIPPING ON ALL ORDERS!! FREE
          SHIPPING ON ALL ORDERS!!
        </div>
      </div>

      {/* Image Frame */}

      <div className="grid grid-cols-4 grid-rows-2 gap-0 border-2 border-black">
        <div className="relative">
          <img
            src="/tin-images/perfectpin.png"
            className="w-full h-full object-cover"
            alt="Perfect Pineapple"
          />
          <span className="sm:hidden hidden md:block absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center bg-opacity-50  text-black font-extrabold p-1 text-md  md:text-xl lg:text-2xl">
            Perfect
            <br />
            Pineapple
          </span>
        </div>

        <div className="relative">
          <img
            src="/tin-images/ginger.jpg"
            className="w-full h-full object-cover"
            alt="Ginger Drink"
          />
          <span className="sm:hidden hidden md:block absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center bg-opacity-50 text-black font-extrabold p-1 text-md sm:text-md md:text-xl lg:text-2xl">
            Ginger
            <br />
            Drink
          </span>
        </div>

        <div className="relative col-span-2 col-start-1 row-start-2">
          <img
            src="/tin-images/orange.png"
            className="w-full h-full object-cover"
            alt="Orange Drink"
          />
          <span className="sm:hidden hidden md:block absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center bg-opacity-50 text-black font-extrabold p-1 text-md sm:text-md md:text-xl lg:text-2xl">
            Orange
            <br />
            Drink
          </span>
        </div>

        <div className="relative col-span-2 row-span-2 col-start-3 row-start-1">
          <img
            src="/tin-images/gridrasberry.png"
            className="w-full h-full object-cover"
            alt="Raspberry Drink"
          />
          <span className="sm:hidden hidden md:block absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center bg-opacity-50 text-black font-extrabold p-1 text-md sm:text-md md:text-xl lg:text-2xl">
            Raspberry
            <br />
            Drink
          </span>
        </div>
      </div>
    </>
  );
};

export default Productframe;
