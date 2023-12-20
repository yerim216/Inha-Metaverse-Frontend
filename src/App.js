import React, { useContext, useEffect, useState } from "react";
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
import Mycalendar from "./pages/Mycalendar";
import CreateProject from "./pages/CreateProject";
import GenMyprofile from "./pages/GenMyprofile";
import CreateMyProfile from "./pages/CreateMyProfile";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Download from "./pages/Download";
import StickerNote from "./components/StickerNote";
import ProjectListsPage from "./pages/ProjectListsPage";
import ProjectMain from "./components/ProjectMain";
import Management from "./components/Management";
import Notification from "./pages/Notification";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserInfoProvider>
        <GoogleReCaptchaProvider reCaptchaKey="6LceFx4pAAAAAIT-f9-OKPbKz6fp-SUUXbh87xcP">
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
    element: <CreateMyProfile />,
  },
  {
    path: "/createmyprofile1",
    element: <GenMyprofile />,
  },
  {
    path: "/projectlists",
    element: <ProjectListsPage />,
  },
  {
    path: "/projectmanagertools/:teamIndex",
    element: <ProjectManagerTools />,
    children: [
      {
        index: true,
        element: <ProjectMain />,
      },
      {
        path: "board",
        element: <Board />,
      },
      {
        path: "mycalendar",
        element: <Mycalendar />,
      },
      {
        path: "stickerNote",
        element: <StickerNote />,
      },
      {
        path: "main",
        element: <ProjectMain />,
      },
      {
        path: "management",
        element: <Management />,
      },
    ],
  },
  {
    path: "/download",
    element: <Download />,
  },
  {
    path: "/notification",
    element: <Notification />,
  },
]);

function App() {
  // window.baseURL = "https://app.vpspace.net/";
  window.baseURL = "http://43.201.166.82:3000/";

  return (
    <RecoilRoot>
      <RouterProvider router={router}></RouterProvider>
    </RecoilRoot>
  );
}

export default App;
