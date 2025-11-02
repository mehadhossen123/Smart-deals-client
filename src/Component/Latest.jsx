import React, { use } from 'react';
import Products from './Products';

const Latest = ({ productPromise }) => {
    const latestProduct=use(productPromise)
    console.log(latestProduct);
    
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {latestProduct.map((product) => (
          <Products key={product._id} product={product}></Products>
        ))}
      </div>
    </div>
  );
};

export default Latest;