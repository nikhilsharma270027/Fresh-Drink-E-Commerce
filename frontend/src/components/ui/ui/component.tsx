/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/4wXaNrXUoZd
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Libre_Franklin } from 'next/font/google'

libre_franklin({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./select"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card"
import { Separator } from "./separator"
import { Button } from "./button"
import { useEffect, useState } from "react";

interface CartItem{
  _id: string;
  name: string;
  size: string;
  imageurl: string;
  price: number;
  quantity: number;
}

export function Component() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(()=> {
    LoadCartFromLocalStorage();
  }, [])
  useEffect(()=> {
    calculateAmount();
  }, [])

  const LoadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart")
    if(savedCart){
        setCart(JSON.parse(savedCart));
    }
  }  

  const calculateAmount = () => {
    const totalAmount = cart.reduce((acc, item) => {
      return acc + Number(item.price) * item.quantity;
    }, 0);
    setTotal(totalAmount);
  }

  const removeFromCart = (productId : string, psize: string) => {

    const updateCart = cart.filter((item) => item._id !== productId && item.size !== psize);
    setCart(updateCart);
    localStorage.setItem('cart', JSON.stringify(updateCart));
}

  return (
    <div className="grid md:grid-cols-[1fr_300px] gap-8 max-w-6xl mx-auto px-4 md:px-6 py-12">
      <div className="grid gap-6">
        <div className="grid gap-4">
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
          <p className="text-gray-500 dark:text-gray-400">Review the items in your cart and proceed to checkout.</p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-4 border rounded-lg overflow-hidden w-full">
            {/* //header */}
            <div className="grid grid-cols-[100px_1fr_100px] items-center gap-4 bg-secondry backdrop-blur-md dark:bg-gray-800 px-4 py-3">
              <span className="font-medium">Product</span>
              <span className="font-medium">Name</span>
              <span className="font-medium text-right">Price</span>
            </div>
            {/* // inside box */}


           {
            cart.length == 0  ? 
            <>
              <img
                src='./public/emptycart.png'
                alt="Product Image"
                width={100}
                height={100}
                className="rounded-md object-cover w-full"
                style={{  objectFit: "cover" }}
              />
              <div className="grid gap-1">
                <h3 className="font-medium">Add items to cart</h3>
              </div>
            </>
            :
            cart.map((item) => (
              <div key={item._id} className="grid grid-cols-[100px_1fr_100px] items-center gap-4 px-4 py-3 border-t dark:border-gray-700">
              <img
                src={item.imageurl}
                alt="Product Image"
                width={100}
                height={100}
                className="rounded-md object-cover"
                style={{ aspectRatio: "100/100", objectFit: "cover" }}
              />
              <div className="grid gap-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {item.size}
                </p>
              </div>
              <div className="flex items-center justify-end gap-2">
                    <span className="font-medium">Rs. {item.price}</span>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeFromCart(item._id, item.size)}
                    >
                      Remove
                    </Button>
                  </div>
            </div>
            ))
           }


          </div>
        </div>
      </div>
      <div className="grid gap-4 mt-24">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-medium">{total}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="font-medium">$0.00</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-medium text-lg">
              <span>Total</span>
              <span>{total}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
