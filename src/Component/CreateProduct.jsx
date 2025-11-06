
import React from 'react';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';


const CreateProduct = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()
  
    console.log(user);
    

const handleCreateProduct=e=>{
    e.preventDefault();
    const name=e.target.name.value;
    const image=e.target.image.value;
    const max_price=e.target.max.value;
    const min_price=e.target.min.value;
    // console.log(name,image,max,min)
    const  newProduct={
        name,image,max_price,min_price,
        email:user?.email,seller_name:user?.displayName
       
       
    }


axiosSecure.post("/products",newProduct).then(
    res=>{
        console.log(res.data)
        if(res.data.insertedId){
              Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Your bid has been placed",
                      showConfirmButton: false,
                      timer: 1500,
                    });
        }
        
    }
)



}

// axios.post("http://localhost:3000/products",newProduct).then(
//     res=>{
//         if(res.data.insertedId){
//               Swal.fire({
//                       position: "top-end",
//                       icon: "success",
//                       title: "Your bid has been placed",
//                       showConfirmButton: false,
//                       timer: 1500,
//                     });
//         }
        
//     }
// )



// }


    return (
      <div className='flex max-w-11/12 mx-auto justify-center'>
        <form onSubmit={handleCreateProduct} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <h1 className="fieldset-legend">Product </h1>

          <label className="label">Name</label>
          <input type="text" className="input" name='name' placeholder="Email" />

          <label className="label">Image URL</label>
          <input type="text" className="input" name='image' placeholder="Password" />


          <label className="label">Max_price</label>
          <input type="text" className="input" name='max' placeholder="Password" />
          <label className="label">Min_price</label>
          <input type="text" className="input" name='min' placeholder="Password" />

          <button className="btn btn-neutral mt-4">Create Product</button>
        </form>
      </div>
    );
};

export default CreateProduct;