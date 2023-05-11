import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
<<<<<<< HEAD
import Profile from './pages/Profile'
=======
import SignUp from "./pages/SignUp";
>>>>>>> feature/story

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
<<<<<<< HEAD
    path: "/profile",
    element: <Profile />,
=======
    path: "/signup",
    element: <SignUp />,
>>>>>>> feature/story
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
