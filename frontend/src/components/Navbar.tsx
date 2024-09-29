import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Button } from "./ui/ui/button";
import Styles from "../styles/navbar.module.css";
import { auth } from "../common/firebase";
import { getAuth } from "firebase/auth";
import axios from "axios";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const navigate = useNavigate();

  // Navigate functions
  const homepage = () => navigate("/");
  const productpage = () => navigate("/product");
  const cartpage = () => navigate("/cart");
  const [open, setOpen] = useState(false);
  const handleLogin = () => navigate("/register");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName || "");
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            userName: user.displayName,
            user_id: user.uid,
            email: user.email,
          })
        );
        const sessionUser = sessionStorage.getItem("user");
        const sessionU = sessionUser ? JSON.parse(sessionUser) : null;
        console.log(sessionU);
        // console.log(user.displayName)
        // fetchuserForSession(user)
      } else setUserName("");
    });
  }, []);

  // const fetchuserForSession = async(user: any) => {

  //   try {
  //     await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/api/login", {
  //       name: user.displayName,
  //       email: user.email,
  //       uid: user.uid,
  //     });
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  //   // finally {
  //   //   console.log("user data set to backend")
  //   // }
  // }

  const handleLogOut = () => {
    const auth = getAuth();
    auth
      .signOut()
      .then(() => {
        // Remove user session
        sessionStorage.removeItem("user");
        window.location.href = "/login";
      })
      .catch((error: any) => {
        console.error("Logout failed: ", error);
      });
  };

  return (
    <div className="border-3 border-black">
      <nav className="z-50 flex justify-between items-center border-3 border-black p-4">
        <div className="justify-center ml-10">
          <Link
            to="/"
            className="flex-none w-10 flex justify-center items-center"
          >
            <img src="/can.png" className="w-210 h-8" />
            <div className="font-extrabold text-500 text-2xl text-black">
              fresh
            </div>
          </Link>
        </div>

        <div className={` hidden sm:hidden md:hidden lg:block xl:block`}>
          <div className={"flex justify-items-center gap-[2rem]"}>
            <div
              className="text-xl font-bold text-black cursor-pointer"
              onClick={homepage}
            >
              Home
            </div>
            <div
              className="text-xl font-bold text-black cursor-pointer"
              onClick={productpage}
            >
              Products
            </div>
            <div className="text-xl font-bold text-black">Contact</div>
            {userName ? (
              <div
                className="text-xl font-bold text-black cursor-pointer"
                onClick={handleLogOut}
              >
                Logout
              </div>
            ) : (
              <div
                className="text-xl font-bold text-black cursor-pointer"
                onClick={handleLogin}
              >
                Login
              </div>
            )}
            {/* {
            open ? 
          <div className={Styles.navclose + ` lg:hidden xl:hidden`} onClick={() => setOpen(!open)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={Styles.closebtn}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
          : " "
          } */}
          </div>
        </div>
        <div className="relative lg:hiiden md:hidden xl:hidden w-full h-full">
          {open == true ? <MobileNavbar setOpen={setOpen} open={open} /> : " "}
        </div>

        <div className="flex justify-center mr-10">
          <div className={Styles.cartBox} onClick={cartpage}>
            <div className="text-xl gap-2 font-bold text-black cursor-pointer">
              Cart
            </div>
            <img className="w-10" src="/cart.png" alt="Cart" />
          </div>

          <div
            className={"ml-4 h-6 w-12 block sm:block lg:hidden xl:hidden"}
            onClick={() => setOpen(!open)}
          >
            <img className={""} src="bars.png"></img>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
