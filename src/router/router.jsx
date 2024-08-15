import {
    createBrowserRouter,
  } from "react-router-dom";
import Layouts from "../Layout/Layout";
import Error from "../Error/Error";
import Home from "../Pages/Home/Home";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layouts></Layouts>,
      errorElement:<Error></Error>,
      children: [
        {
            path:"/",
            element:<Home></Home>
        }
      ]  
    },
  ]);