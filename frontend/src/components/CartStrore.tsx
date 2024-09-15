import { useEffect, useState } from 'react'
import { Component } from './ui/ui/component';

interface CartItem{
    _id: string;
    name: string;
    size: string;
    imageurl: string;
    price: number;
    quantity: number;
}

const CartStrore = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(()=> {
    LoadCartFromLocalStorage();
  }, [])

  const LoadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart")
    if(savedCart){
        setCart(JSON.parse(savedCart));
    }
  }  
  return (
    <div>
        <Component />
      {/* {
        cart.map((item) => (
            <>
            <div key={item._id}>{item.name}</div>
            <img src={item.imageurl} alt={item.name} className='small-square'/>
            <div>{item.price}</div>
            </>
        ))
      } */}
    </div>
  )
}

export default CartStrore
