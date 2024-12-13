// import React from 'react'
// import { BreadcrumbWithCustomSeparator } from '../components/breadcrum';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'
import Product from '../components/Product'
import StickyFooter from '../components/Stickfoot';
import Strap from '../components/Strap';

const ProductPage = () => {
  return (
    <div>
        <Navbar />
        <Strap />
        <StickyFooter />
        <Product />
        <Footer />
    </div>
  )
}

export default ProductPage;