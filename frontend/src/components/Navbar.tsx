import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Button } from "./ui/ui/button";
import Styles from '../styles/navbar.module.css'
import { auth } from "../common/firebase";
import { getAuth } from "firebase/auth";
// import { onAuthStateChanged } from "firebase/auth";
const Navbar = () => {
  const navigate = useNavigate();

  // Navigate functions
  const homepage = () => navigate('/');
  const productpage = () => navigate('/product');
  const cartpage = () => navigate('/cart');
  const [open, setOpen] = useState(false);
  const handleLogin = () => navigate('/register')
  const [ userName, setUserName ] = useState("")
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        setUserName(user.displayName || "")
        sessionStorage.setItem('user', JSON.stringify({
          userName: user.displayName,
          user_id: user.uid,

        }));
        const sessionUser = sessionStorage.getItem('user');
        const sessionU = sessionUser ? JSON.parse(sessionUser) : null;
        console.log(sessionU)
        // console.log(user.displayName)
      } else setUserName("")
    })
  }, [])

  const handleLogOut = () => {
    const auth = getAuth();
    auth.signOut()
      .then(() => {
        // Remove user session
        sessionStorage.removeItem('user');
        window.location.href = '/login';
      })
      .catch((error: any) => {
        console.error("Logout failed: ", error);
      });
  };

  return (
    <div className="border-3 border-black">
      <nav className="z-50 flex justify-around items-center border-3 border-black p-4">
        <div className="justify-start ">
        <Link to="/" className="flex-none w-10 flex justify-center items-center">
          <img src="/can.png" className="w-210 h-8" />
          <div className="font-bold text-500 text-2xl text-black">fresh</div>
          {/* <h3>Welcome : {userName || ''}</h3> */}
        </Link>
        </div>
          

        <div className={`flex justify-items-center gap-[2rem] ${open ? "sm:hidden md:hidden hidden " : ""}`}>

          <div className="text-xl font-bold text-black cursor-pointer" onClick={homepage}>Home</div>
          <div className="text-xl font-bold text-black cursor-pointer" onClick={productpage}>Products</div>
          <div className="text-xl font-bold text-black">Contact</div>
          { userName ? (
                <div className="text-xl font-bold text-black cursor-pointer"  onClick={handleLogOut}>Logout</div>
              ) : (
                <div className="text-xl font-bold text-black cursor-pointer"  onClick={handleLogin}>Login</div>
              )}
          
        </div>

        <div className="flex justify-end ">
          <div className={Styles.cartBox}>
            <div className="text-xl gap-2 font-bold text-black cursor-pointer" onClick={cartpage}>Cart</div>
            <img className="w-10" src="/cart.png" alt="Cart" />
          </div>

        <div className={'ml-4'} onClick={() => setOpen(!open)}><img className={''} src='bars.png'></img></div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
