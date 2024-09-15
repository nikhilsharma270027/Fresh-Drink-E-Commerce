import React from "react";
import Flavors from '../components/Flavors'
import Footer from '../components/Footer'
import Imageselector from '../components/Imageselector'
import Navbar from '../components/Navbar'
import Productframe from '../components/Productframe'

const Home = () => {
  return (
    <div className='w-full h-full'>
      <Navbar />
      <Productframe />
      <Flavors />
      <Imageselector/>
      <Footer />
    </div>
  )
}

export default Home
