import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Profile from './pages/Profile'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
