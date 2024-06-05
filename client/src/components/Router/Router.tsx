import UserLogin from "../authentication/UserLogin";
import UserSignUp from "../authentication/UserSignUp";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import PrivateUserRoute from "./PrivateUserRoute";

const Router = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <UserLogin />,
    },
    {
      path: "/register",
      element: <UserSignUp />,
    },
    {
      element: <PrivateUserRoute />,
      children: [
        {
          path: "/home",
          element: <UserLogin />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};
export default Router;
