import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import Swal from 'sweetalert2';

const MyBids = () => {
    const {user}=use(AuthContext);
    const [bids,setBids]=useState([])

useEffect(()=>{

if(user?.email){
    fetch(`http://localhost:3000/bids?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBids(data)
      });

}

},[user?.email])



const handleDeleteBid=(_id)=>{
   Swal.fire({
     title: "Are you sure?",
     text: "You won't be able to revert this!",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#3085d6",
     cancelButtonColor: "#d33",
     confirmButtonText: "Yes, delete it!",
   }).then((result) => {
     if (result.isConfirmed) {
  fetch(`http://localhost:3000/bids/${_id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((result) => {
    //   console.log("after deleted data", result);
    if(result.deletedCount){
         Swal.fire({
           title: "Deleted!",
           text: "Your bids has been deleted.",
           icon: "success",
         });
    }
      const presentBids=bids.filter(bid=>bid._id!==_id);
       setBids(presentBids)

    });


        console.log("now delete your data ")
    
     }
   });
    
}



    return (
      <div>
        <h1>My total bids is : {bids.length} </h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL No:</th>
                <th>Buyer name</th>
                <th>Buyer email </th>
                <th>Bid price</th>
                <th>Status</th>
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
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>{bid.buyer_email}</td>
                  <td>{bid.bid_price}</td>
                  <td>
                    {bid.status === "pending" ? (
                      <div className="badge badge-warning">pending</div>
                    ) : (
                      <div className="badge badge-success">setup</div>
                    )}
                  </td>
                  <th>
                    <button onClick={()=>handleDeleteBid(bid._id)} className="btn btn-outline btn-xs">Remove bid</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default MyBids;