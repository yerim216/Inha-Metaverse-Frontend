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
import Mycalendar from "./pages/Mycalendar";
import CreateProject from "./pages/CreateProject";
import GenMyprofile from "./pages/GenMyprofile";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Download from "./pages/Download";
import PostIt from "./components/StickerNote";
import StickerNote from "./components/StickerNote";
import ProjectListsPage from "./pages/ProjectListsPage";
import ProjectMain from "./components/ProjectMain";
import ThemeProvider from "./contexts/ThemeProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserInfoProvider>
        <GoogleReCaptchaProvider reCaptchaKey="6LcqNDAmAAAAAKR81rlDOgBrUSXVBQAGLK8iI_Hr">
          <ThemeProvider>
            <Home />
          </ThemeProvider>
        </GoogleReCaptchaProvider>
      </UserInfoProvider>
    ),
  },
  {
    path: "/profile",
    element: (
      <ThemeProvider>
        <Profile />
      </ThemeProvider>
    ),
  },
  {
    path: "/myprofile",
    element: (
      <ThemeProvider>
        <Myprofile />
      </ThemeProvider>
    ),
  },
  {
    path: "/createproject",
    element: (
      <ThemeProvider>
        <CreateProject />
      </ThemeProvider>
    ),
  },
  {
    path: "/createmyprofile",
    element: (
      <ThemeProvider>
        <GenMyprofile />
      </ThemeProvider>
    ),
  },
  {
    path: "/projectlists",
    element: (
      <ThemeProvider>
        <ProjectListsPage />
      </ThemeProvider>
    ),
  },
  {
    path: "/projectmanagertools/:teamIndex",
    element: (
      <ThemeProvider>
        <ProjectManagerTools />
      </ThemeProvider>
    ),
    children: [
      {
        index: true,
        element: <Board />,
      },
      { path: "board", element: <Board /> },
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
    ],
  },
  {
    path: "/download",
    element: <Download />,
  },
]);

function App() {
  window.baseURL = "https://app.vpspace.net/";

  return (
    <RecoilRoot>
      <RouterProvider router={router}></RouterProvider>
    </RecoilRoot>
  );
}

export default App;
