// import React from 'react'

const Productframe = () => {
  return (
    <>
      <div className="h-8 border-2  border-black">
        <div className="text-black h-7  bg-yellow-300 border-black text-center">
          Organic & Vegan Friendly Kombucha
        </div>
      </div>

      <div className="h-[35rem] flex items-center justify-between border-2 border-black overflow-hidden">
        <div className="w-1/2">
          <h1 className="font-bold text-balance px-12 text-center">
            Fresh, fun & full of flavour
          </h1>
          <i className="text-3xl text-left">kombucha with a twist !</i>
          <br></br>
          <button className="bg-black text-white font-bold flex-none text-left py-2 px-2 ">
            Shop
          </button>
        </div>
        <div className="w-1/2">
          <img
            className=" bg-[#68f1d7] aspect-auto overflow-hidden object-cover"
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
          <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center bg-opacity-50  text-black font-extrabold p-1 text-2xl">
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
          <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center bg-opacity-50 text-black font-extrabold p-1 text-2xl">
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
          <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center bg-opacity-50 text-black font-extrabold p-1 text-2xl">
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
          <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center bg-opacity-50 text-black font-extrabold p-1 text-2xl">
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
