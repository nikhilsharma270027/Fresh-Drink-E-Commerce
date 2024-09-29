import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "./ui/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/ui/accordion";
import { Download } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/ui/carousel";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
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

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_DOMAIN + `/api/products/${id}`
      );
      setProduct(response);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-wrap-reverse">
        <div className="md:w-1/2 m-4">
          <div className="text-left pl-4 text-4xl font-extrabold text-pretty ">
            Fresh Focused Mixed Flavours
          </div>
          <div className="text-left pl-4 mt-2">
            Rs. 700 <del>Rs. 950</del>
          </div>
          <li className="text-left pl-4 mt-2">100 in stock</li>
          <div className="w-full pl-4 border-2 border-black bg-white p-2 mt-2">
            <div className="flex justify-center items-center w-full">
              <img src="/leaf.png" alt="" className="h-4 gap-.5" />
              <div className="text-pretty w-full text-sm text-left px-2 py-1">
                All natural ingredients
              </div>
            </div>
          </div>
          <div className="w-full pl-4 border-2 border-black bg-white p-2 mt-2">
            <div className="flex justify-center items-center">
              <img src="/leaf.png" alt="" className="h-4 gap-.5" />
              <div className="text-pretty w-full text-small text-left px-2 py-1">
                All natural ingredients
              </div>
            </div>
          </div>

          <div className="mt-2">
            <p className="text-left font-bold">Size guide</p>
          </div>
          <div className="gap-2 text-left mt-3">
            <Button className="rounded-full py-2 px-6 ml-2 ">250ml </Button>
            <Button
              className="rounded-full py-2 px-6 ml-2 border-black "
              variant={"outline"}
            >
              500ml
            </Button>
          </div>
          <div className="flex w-[100%] border-2 border-black justify-evenly mb-2 ml-2 mt-3">
            <button onClick={dec} disabled={count === 1}>
              -
            </button>
            <div>{count}</div>
            <button onClick={inc} disabled={count === 10}>
              +
            </button>
          </div>

          <Button
            onClick={() => navigate("/cart")}
            className="w-[100%] ml-2 mt-2"
          >
            Add to cart
          </Button>
          <Button className="w-[100%] bg-[#bd5aeb] ml-2 mt-2">Buy now</Button>
          <div className="mt-2">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Whats the deal with sugar?</AccordionTrigger>
                <AccordionContent>
                  When brewing Fresh Kombucha, raw organic sugar is used as a
                  key starter ingredient acting as food for the all important
                  live cultures. During our 30-day long aged brewing process,
                  all of this sugar is converted into healthy organic acids
                  leaving no sugar (and we test each batch to make sure of it).
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Should I keep my Kombucha in or out of the fridge?
                </AccordionTrigger>
                <AccordionContent>
                  When brewing Fresh Kombucha, raw organic sugar is used as a
                  key starter ingredient acting as food for the all important
                  live cultures. During our 30-day long aged brewing process,
                  all of this sugar is converted into healthy organic acids
                  leaving no sugar (and we test each batch to make sure of it).
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Is there any alcohol in your kombucha?
                </AccordionTrigger>
                <AccordionContent>
                  All of our drinks are non-alcoholic. A trace amount of alcohol
                  can be produced during the natural fermentation process. We
                  thoroughly test each and every batch to ensure that this does
                  not go above 0.5% as per national standards for non-alcoholic
                  drinks.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="text-left mt-3">
            <Button>
              <Download className="mr-2" /> Share
            </Button>
          </div>
          <div className="m-5 ml-2">
            <div className="text-pretty font-bold text-left">
              Introducing our Raspberry Flavored Kombucha—a delightful symphony
              of tangy sweetness that will ignite your taste buds with every
              sip. Crafted with care, our kombucha combines the finest tea, live
              cultures, and the vibrant essence of ripe raspberries.
            </div>
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="hidden">

          <img src="/orange.png" alt="" className="" />
          <img src="/orangeslide.png" alt="" className="" />
          </div>
        <div className="sm:hidden block relative">
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
      </div>
    </>
  );
};

export default ProductDetail;
