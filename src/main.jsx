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
import MyProduct from './Component/MyProduct.jsx';
import MyBids from './Component/myBids.jsx';
import PrivateRoute from './Private/PrivateRoute.jsx';
import ProductDetails from './Component/ProductDetails.jsx';



const router = createBrowserRouter([
  {
    path: "/",

    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/",
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/allProducts",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/myProducts",
        element: (
          <PrivateRoute>
            <MyProduct></MyProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "/myBids",
        element: (
          <PrivateRoute>
            <MyBids></MyBids>
          </PrivateRoute>
        ),
      },
      {
        path: "/productDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
        element: <ProductDetails></ProductDetails>,
      },
    ],
  },
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
