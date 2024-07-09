import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex'>
      <div className='w-1/2 m-4'>
        <div className='text-left pl-4'>Fresh Focused Mixed Flavours</div>
        <div className='text-left pl-4'>Rs. 700 <del>Rs. 950</del></div>
        <li className='text-left pl-4'>100 in stock</li>
        <div className='w-6/12 pl-4 border-2 border-black bg-white p-2'>
          <div className='flex justify-center items-center'>
            <img src="/leaf.png" alt="" className='h-4 gap-.5'/>
            <div>All natural ingredients</div>
          </div>
        </div>
        <div className='w-6/12 pl-4 border-2 border-black bg-white p-2'>
          <div className='flex justify-center items-center'>
            <img src="/leaf.png" alt="" className='h-4 gap-.5'/>
            <div>All natural ingredients</div>
          </div>
        </div>
        <div>

        </div>
      </div>
      <div className='w-1/2'>img</div>
    </div>
  );
};

export default ProductDetail;
