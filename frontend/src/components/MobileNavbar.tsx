import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../common/firebase";
import Styles from '../styles/navbar.module.css'
import { Button } from "./ui/ui/button";

const MobileNavbar = ({open, setOpen}: any) => {
  const navigate = useNavigate();

  // Navigate functions
  const homepage = () => navigate("/");
  const productpage = () => navigate("/product");
  const cartpage = () => navigate("/cart");
  // const [open, setOpen] = useState(false);
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
        // console.log(sessionU);
        // console.log(user.displayName)
        // fetchuserForSession(user)
      } else setUserName("");
    });
  }, []);

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

  const handleBlur = () => {
    setTimeout(() => {
        setOpen(!open);
    }, 100);
}  

  return (
    <div
      className={`md:block absolute border-2 border-black  bg-[#bd5aeb] -left-14 right-0 -top-11 border-grey  w-screen hi rounded-lg translate ease-in-out delay-100 mb-6`}
    >
      <div className={"flex justify-items-center flex-col"}>
        <Button className={Styles.navclose } onBlur={handleBlur} onClick={() => setOpen(!open)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={Styles.closebtn}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
        <div
          className="text-xl p-4 font-bold text-black cursor-pointer mt-1 hover:bg-[#9d4ac4]"
          onClick={homepage}
        >
          Home
        </div>
        <div
          className="text-xl p-4 font-bold text-black cursor-pointer hover:bg-[#9d4ac4]"
          onClick={productpage}
        >
          Products
        </div>
        <div className="text-xl p-4 font-bold text-black cursor-pointer hover:bg-[#9d4ac4]">Contact</div>
        {userName ? (
          <div
            className="text-xl p-4 font-bold text-black cursor-pointer mb-8 hover:bg-[#9d4ac4]"
            onClick={handleLogOut}
          >
            Logout
          </div>
        ) : (
          <div
            className="text-xl p-4 font-bold text-black cursor-pointer mb-8 hover:bg-[#9d4ac4]"
            onClick={handleLogin}
          >
            Login
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNavbar;
