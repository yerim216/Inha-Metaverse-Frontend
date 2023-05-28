import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import UserInfoProvider from "./contexts/UserInfoProvider";
import Myprofile from "./pages/Myprofile";

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
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "myprofile",
    element: <Myprofile />,
  },
  {
    path: "/signin",
    element: (
      <UserInfoProvider>
        <SignIn />
      </UserInfoProvider>
    ),
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
