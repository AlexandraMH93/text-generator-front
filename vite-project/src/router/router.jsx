import { createBrowserRouter, redirect } from "react-router-dom"

import AuthLayout from "../layouts/AuthLayout"
import MainLayout from "../layouts/MainLayout"

import Login from "../pages/login/Login"
import SignUp from "../pages/signup/Signup"
import Dashboard from "../pages/dashboard/Dashboard"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    loader: () => {
      if (localStorage.getItem("token")) {
        return redirect("/dashboard")
      }
      return null
    },
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <MainLayout />,
    loader: () => {
      if (!localStorage.getItem("token")) {
        return redirect("/")
      }
      return null
    },
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
    children: [
        { path: "", element: <Dashboard /> },
      ]
  },
])

export default router
