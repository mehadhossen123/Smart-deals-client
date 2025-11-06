import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, userSignOut } = useAuth();
  const navigate=useNavigate()



  useEffect(() => {
   
    const interceptor = instance.interceptors.request.use((config) => {
    //   console.log("Axios config before sending:", config);

      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }

      return config;
    });

    // response interceptor is here 
   const responseInterceptor= instance.interceptors.response.use(res=>{


    return res;

    },err=>{
        // console.log("error inside the interceptor",err);
        const status=err.status;
        if(status===401|| status===403){
            // console.log("logout the user for bad request ");
            userSignOut().then(()=>{
                //navigate the user 
                navigate('/register')

            })

            
        }
        
    })

 
    return () => {
      instance.interceptors.request.eject(interceptor);
      instance.interceptors.response.eject(responseInterceptor)
    };
  }, [user,navigate,userSignOut]);

  return instance;
};

export default useAxiosSecure;
