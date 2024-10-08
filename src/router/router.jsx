import {
    createBrowserRouter,
  } from "react-router-dom";
import Layouts from "../Layout/Layout";
import Error from "../Error/Error";
import Home from "../Pages/Home/Home";
import Signin from "../Pages/Signin/Signin";
import Signup from "../Pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layouts></Layouts>,
      errorElement:<Error></Error>,
      children: [
        {
            path:"/",
            element:<PrivateRoute><Home></Home></PrivateRoute>
        },
        {
          path:"/signin",
          element:<Signin></Signin>
        },
        {
          path:"/signup",
          element:<Signup></Signup>
        }
      ]  
    },
  ]);