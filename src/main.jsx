import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import HomeLayout from './Layout/HomeLayout.jsx';
import Home from './Component/Home.jsx';
import AllProducts from './Component/AllProducts.jsx';
import AuthProvider from './AuthContext/AuthProvider.jsx';
import Register from './Component/Register.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    
    element: <HomeLayout></HomeLayout>,
    children:[
      {
        path:"/",
        index:true,
        element:<Home></Home>
      },
      {
        path:"/allProducts",
        element:<AllProducts></AllProducts>

      },
      {
        path:"/register",
        element:<Register></Register>
      }
    ]
  },
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
