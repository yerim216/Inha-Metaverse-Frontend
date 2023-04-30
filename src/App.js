import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Top from "./pages/Top";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/top",
    element: <Top />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
