import React, {useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UserInfoProvider from "./contexts/UserInfoProvider";
import Myprofile from "./pages/Myprofile";
import Calendar from "./pages/Calendar";
import Calendar2 from "./pages/Calendar2";


import {RecoilRoot} from "recoil";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserInfoProvider>
        <Home />
      </UserInfoProvider>
    ),
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/myprofile",
    element: <Myprofile />,
  },
  {
    path: "/calendar",
    element: <Calendar />,
  },
  {
    path: "/calendar2",
    element: <Calendar2 />,
  }
]);

function App() {
  return (
      <RecoilRoot>
        <RouterProvider router={router}></RouterProvider>     
      </RecoilRoot>
    );
}

export default App;
