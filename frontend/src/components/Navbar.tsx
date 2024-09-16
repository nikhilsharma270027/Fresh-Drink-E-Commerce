import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/ui/button";
import { useEffect } from "react";

const Navbar = () => {
  const { loginWithRedirect, isAuthenticated, logout, user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  // Navigate functions
  const homepage = () => navigate('/');
  const productpage = () => navigate('/product');
  const cartpage = () => navigate('/cart');

  // useEffect(() => {
  //   const getUserMetadata = async () => {
  //     try {
  //       Protocal();
  //     } catch (e) {
  //       console.log("error in signup");
  //     }
  //   };

  //   getUserMetadata();
  // }, [getAccessTokenSilently, user?.sub]);

  // useEffect(() => {
  //   if (isAuthenticated && user) {
  //     // Ensure user is defined before sending data to the backend
  //     const { name, email } = user;
  //     if (name && email) {
  //       fetch('/api/save-user', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ name, email }),
  //       })
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log('User saved:', data);
  //       })
  //       .catch((error) => {
  //         console.error('Error saving user:', error);
  //       });
  //     }
  //   }
  // }, [isAuthenticated, user]);



  // async function Protocal() {
  //   try {
  //     if (user) {
  //       const token = await getAccessTokenSilently({
  //         authorizationParams: {
  //           audience: "https://dev-e7kwz32ylcdzonq1.us.auth0.com/api/v2/",
  //           scope: "openid profile email",
  //         },
  //       });
  
  //       const response = await fetch("/api/save-user", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(user),
  //       });
  
  //       const data = await response.json();
  //       console.log("User saved:", data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }
  useEffect(() => {
    const fetchTokenAndSaveUser = async () => {
      try {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: "https://dev-e7kwz32ylcdzonq1.us.auth0.com/api/v2/",
              scope: "openid profile email",
            },
          });console.log(token)


          await fetch("/api/save-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
          });
        }
      } catch (error) {
        console.error("Error in saving user", error);
      }
    };

    if (isAuthenticated && user) fetchTokenAndSaveUser();
  }, [getAccessTokenSilently, isAuthenticated, user]);




  return (
    <div className="border-3 border-black">
      <nav className="z-50 flex justify-around items-center border-3 border-black p-4">
        <Link to="/" className="flex-none w-10 flex justify-center items-center">
          <img src="/can.png" className="w-210 h-8" />
          <div className="font-bold text-500 text-2xl text-black">fresh</div>
          <p className="justify-center">Welcome: {user?.name}</p>
        </Link>

        <div className="flex justify-items-center gap-[2rem]">
          <div className="text-xl font-bold text-black cursor-pointer" onClick={homepage}>Home</div>
          <div className="text-xl font-bold text-black cursor-pointer" onClick={productpage}>Products</div>
          <div className="text-xl font-bold text-black">Contact</div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center">
            <div className="text-xl gap-2 font-bold text-black cursor-pointer" onClick={cartpage}>Cart</div>
            <img className="w-10" src="/cart.png" alt="Cart" />
          </div>
          {!isAuthenticated ? (
            <Button variant={"default"} onClick={() => loginWithRedirect()}>
              Log In
            </Button>
          ) : (
            <Button variant={"default"} onClick={() => logout()}>
              Log Out
            </Button>
          )}

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
