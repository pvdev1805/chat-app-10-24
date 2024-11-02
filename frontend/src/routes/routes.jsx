import LayoutDefault from "../layouts/LayoutDefault/index.jsx";
import Home from "../pages/Home/index.jsx";
import LogIn from "../pages/LogIn/index.jsx";
import SignUp from "../pages/SignUp/index.jsx";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <LogIn />,
      },
    ],
  },
];
