import SingleProduct from "../components/SingleProduct";
import Navbar from "../components/Navbar";
import Strap from "../components/Strap";
import Footer from "../components/Footer";
import StickyFooter from "../components/Stickfoot";

const SingleProductPage = () => {
  return (
    <div>
      <Navbar />
      <Strap />
      <SingleProduct />
      <StickyFooter />
      <Footer />
    </div>
  );
};

export default SingleProductPage;
