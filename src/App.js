import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UserInfoProvider from "./contexts/UserInfoProvider";
import Myprofile from "./pages/Myprofile";
import { RecoilRoot } from "recoil";
import ToDo from "./pages/ToDo";
import Board from "./components/Board";
import ProjectManagerTools from "./pages/ProjectManagerTools";
import Calendar2 from "./pages/Calendar2";
import CreateProject from "./pages/CreateProject";
import GenMyprofile from "./pages/GenMyprofile";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserInfoProvider>
        <GoogleReCaptchaProvider reCaptchaKey="6LcqNDAmAAAAAKR81rlDOgBrUSXVBQAGLK8iI_Hr">
          <Home />
        </GoogleReCaptchaProvider>
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
    path: "/createproject",
    element: <CreateProject />,
  },
  {
    path: "/createmyprofile",
    element: <GenMyprofile />,
  },
  {
    path: "projectmanagertools",
    element: <ProjectManagerTools />,
    children: [
      {
        index: true,
        element: <Board />,
      },
      { path: "board", element: <Board /> },
      {
        path: "calendar2",
        element: <Calendar2 />,
      },
    ],
  },
]);

function App() {
  window.baseURL = "https://www.app.vpspace.net/";

  return (
    <React.StrictMode>
      <RecoilRoot>
        <RouterProvider router={router}></RouterProvider>
      </RecoilRoot>
    </React.StrictMode>
  );
}

export default App;
