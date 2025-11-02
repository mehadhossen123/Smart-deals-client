import React from "react";
import { Link } from "react-router";

const Products = ({ product }) => {
  const { _id, title, price_max, price_min, image } = product;

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img
          src={
            image ||
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          }
          alt={title}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>
          Price Range: ${price_min} - ${price_max}
        </p>
        <div className="card-actions w-full justify-center">
          <Link to={`/productDetails/${_id}`} className="btn btn-primary w-full">View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
