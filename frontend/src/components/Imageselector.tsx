// import React from 'react'
import { useState } from "react";
import { Button } from "./ui/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/ui/carousel";
import { useNavigate } from "react-router-dom";

const Imageselector = () => {
  let [count, setCount] = useState(1);
  const navigate = useNavigate();

  const inc = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };
  const dec = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  return (
    <>
      <div className="mb-10 md:mb-10 border-2 border-black border-b-2">
        <div className="flex flex-wrap mb-10 md:mb-10">

          <div className="md:w-1/2 max-auto sm:pt-20 md:pt-5 lg:pt-0">
            <div className="relative">
              <Carousel className="relative">
                <CarouselContent className="relative">
                  <CarouselItem className="relative">
                    <img
                      className="h-30 w-30 object-fill overflow-hidden"
                      src="orange.png"
                      alt=""
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img src="orangeslide.png" alt="" />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10" />
                <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10" />
              </Carousel>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="m-10 mt-6 md:m-1 md:mt-1">
              <div className="ml-2 py-10 text-left font-extrabold text-5xl md:3xl">
                Fresh Kombucha Orange
              </div>
              <div className="ml-2 text-left font-mono">Rs.400</div>
              <li className="ml-2 font-semibold text-left list-de">
                100 In stock{" "}
              </li>
              <p className="ml-2 font-extrabold text-left">Size</p>
              <div className="p-3 flex">
                <Button className="rounded-full ml-4 px-3 py-2">
                  1 x 250ml
                </Button>
                <Button className="rounded-full ml-4 border-2 border-black px-3 py-1">
                  1 x 500ml
                </Button>
              </div>
              <div className="flex w-[100%] border-2 border-black justify-evenly mb-2 ml-2">
                <button onClick={dec} disabled={count === 1}>
                  -
                </button>
                <div>{count}</div>
                <button onClick={inc} disabled={count === 10}>
                  +
                </button>
              </div>
              <Button onClick={()=> navigate('/cart')} className="w-[100%] ml-2">Add to cart</Button>
            </div>
          </div>
        </div>

        <div className="mt-8  border-1 border-black border-t-2">
          <div className="px-4 py-16 text-5xl font-extrabold text-left">We started fresh in our kitchen and
          loved every moment!</div>
        </div>
      </div>
    </>
  );
};

export default Imageselector;
