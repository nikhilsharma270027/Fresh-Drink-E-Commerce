// import React from 'react'
// import { BreadcrumbWithCustomSeparator } from '../components/breadcrum';
import Navbar from '../components/Navbar'
import Product from '../components/Product'
import Strap from '../components/Strap';

const ProductPage = () => {
  return (
    <div>
        <Navbar />
        {/* <BreadcrumbWithCustomSeparator /> */}
        <Strap />
        <Product />
    </div>
  )
}

export default ProductPage;