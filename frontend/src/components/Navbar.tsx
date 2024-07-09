import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);

  const homepage = () => {
    navigate('/');
  }

  const productpage = () => {
    navigate('/product');
  }

  const cartpage = () => {
    navigate('/cart');
  }
  return (
    <>
      <div className="border-3 border-black">
        <nav className=" z-50 flex justify-around items-center border-3 border-black p-4">
          <Link to="/" className="flex-none w-10 flex justify-center">
            <img src="/can.png" className="w-210 h-8" />
            <div className="font-bold text-500 text-2xl text-black">fresh</div>
          </Link>

          {/* <div className={"absolute w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " + ( searchBoxVisibility ? "show" : "hide" )}>
                <input 
                type='text'
                placeholder='Search'
                    className='shrink w-full bg-black text-white border-2 border-black md:w-auto bg-grey p-3 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12'

                    />
                    
                    <i className='fi fi-rr-search absolute right-[10%] 
                md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2
                text-xl text-dark-grey'></i>
        </div> */}

          <div className="flex justify- items-center gap-[2rem]">
            <div className="text-xl font-bold text-black cursor-pointer" onClick={homepage}>Home</div>
            <div className="text-xl font-bold text-black cursor-pointer" onClick={productpage}>Products</div>
            <div className="text-xl font-bold text-black">Contact</div>
          </div>

          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center">
              <div className="text-xl gap-2 font-bold text-black cursor-pointer" onClick={cartpage}>Cart</div>
              <img className="w-10" src="/cart.png"></img>
            </div>
          </div>

          {/* <div className='flex items-center gap-3 md:gap-6'>
                <button className='md:hidden bg-grey w-12 h-12 rounded-full 
                flex items-center justify-center' 
                onClick={() => setSearchBoxVisibility(currentVal => !currentVal)}
                >
                <i className="text-black bg-white fi fi-rr-search text-xl"></i>
                </button>
                </div> */}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
