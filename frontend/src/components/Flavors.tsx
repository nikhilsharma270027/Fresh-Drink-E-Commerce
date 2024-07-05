// import React from 'react'

const Flavors = () => {
  return (
    <div className="border-2 border-black">
        <h1 className="text-3xl text-black text-left p-4 py-8 font-extrabold">Our flavors</h1>
        <div className="flex justify-center">
            <div className="mb-10">
                <img src="/rasberry.png" alt="" />
                <div className="text-xl font-bold text-center">Fresh Kombucha</div>                                            
                <div className="text-xl font-bold text-center px-3">Rashberry</div>
                <span className=" px-3">From Rs.300</span>
            </div>
            <div className="mb-10">
                <img src="/pineapple.png" alt="" />
                <div className="text-xl font-bold text-center px-3">Fresh Kombucha</div>                                            
                <div className="text-xl font-bold text-center px-3">Pineapple</div>
                <span className=" px-3">From Rs.300</span>
            </div>
            <div className="mb-10">
                <img src="/orange.png" alt="" />
                <div className="text-xl font-bold text-center px-3">Fresh Kombucha</div>                                            
                <div className="text-xl font-bold text-center px-3">Orange</div>
                <span className=" px-3">From Rs.350</span>
            </div>
            <div className="mb-10">
                <img src="/lime&mint.png" alt="" />
                <div className="text-xl font-bold text-center px-3">Fresh Kombucha</div>                                            
                <div className="text-xl font-bold text-center px-3">Lime & Mint</div>
                <span className=" px-3">From Rs.350</span>
            </div>
        </div>
    </div>
  )
}

export default Flavors