import React from 'react';
import Latest from './Latest';

const productPromise = fetch("http://localhost:3000/latest-product").then(res=>res.json());

const Home = () => {
    return (
        <div>
            <h1 className=''>I am from home </h1>
             <Latest productPromise={productPromise}></Latest>
        </div>
    );
};

export default Home;