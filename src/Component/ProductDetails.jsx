import React, { use, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../AuthContext/AuthContext';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const {_id:productId}=useLoaderData()
    const [bids,setBids]=useState([])
    console.log(bids)
    // console.log(data);
    const modalsRef=useRef()
    const {user}=use(AuthContext)

    const handleModalsBids=()=>{
        modalsRef.current.showModal()

    }
    const handleBidSubmit = (e)=>{
        e.preventDefault()
        const name=e.target.name.value;
        const email=e.target.email.value;
        const bid=e.target.bid.value;
        console.log(productId,name,email,bid)
     const newBid = {
       product: productId,
       buyer_name: name,
       buyer_email: email,
       bid_price:bid
     };

    //  sending bids user data into database 
    fetch("http://localhost:3000/bids", {
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(newBid)
    })
      .then((res) => res.json())
      .then((data) => {
       if(data.insertedId){
        modalsRef.current.close()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your bid has been placed",
          showConfirmButton: false,
          timer: 1500,
        });
       newBid._id=data.productId
       const newBids=[...bids,newBid].sort((a,b)=>b.bid_price-a.bid_price)
       setBids(newBids)

       }
      });
       

    }
    useEffect(()=>{
        fetch(`http://localhost:3000/bids/products/${productId}`).then(res=>res.json()).then(data=>{
            setBids(data)
        })
    },[productId])
    
    return (
      <div>
        <div>
          {/* product details */}
          <div>
            {/* bids details */}
            <button onClick={handleModalsBids} className="btn btn-primary">
              i want to buy this product
            </button>

            <dialog
              ref={modalsRef}
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg">Give the best offer</h3>
                <p className="py-4">Offer something seller can't be resist</p>

                <form onSubmit={handleBidSubmit} action="">
                  <fieldset className="fieldset">
                    <label className="label">Name</label>
                    <input
                      name="name"
                      type="text"
                      className="input"
                      readOnly
                      defaultValue={user?.displayName}
                    />
                    <label className="label">Email</label>
                    <input
                      name="email"
                      type="email"
                      className="input"
                      readOnly
                      defaultValue={user?.email}
                    />
                    {/* bid  amount is here  */}
                    <label className="label">Bid</label>
                    <input
                      name="bid"
                      type="text"
                      className="input"
                      placeholder="Bid"
                    />

                    <button className="btn btn-neutral mt-4">
                      Please your bid{" "}
                    </button>
                  </fieldset>
                </form>

                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
        <div>
          {/* bids details */}
          <h1 className="text-blue-500 text-4xl">
            Total bids for this product:{bids.length}
          </h1>

          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>SL No:</th>
                  <th>Buyer name</th>
                  <th>Buyer email </th>
                  <th>Bid price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {bids.map((bid, index) => (
                  <tr key={index}>
                    <th>{index + 1} </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{bid.buyer_name}</div>
                          <div className="text-sm opacity-50">
                            United States
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                     {bid.buyer_email}
                    </td>
                    <td>{bid.bid_price}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};

export default ProductDetails;