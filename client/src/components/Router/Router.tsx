// import UserLogin from "../authentication/UserLogin";
// import UserSignUp from "../authentication/UserSignUp";
// import { createBrowserRouter } from "react-router-dom";
// import { RouterProvider } from "react-router-dom";
// import PrivateUserRoute from "./PrivateUserRoute";
// import HomePage from "../Home/HomePage";

// const Router = () => {
//   const appRouter = createBrowserRouter([
//     {
//       path: "/",
//       element: <UserLogin />,
//     },
//     {
//       path: "/register",
//       element: <UserSignUp />,
//     },
//     {
//       element: <PrivateUserRoute />,
//       children: [
//         {
//           path: "/home",
//           element: <HomePage />,
//         },
//       ],
//     },
//   ]);

//   return (
//     <div>
//       <RouterProvider router={appRouter} />
//     </div>
//   );
// };
// export default Router;

import UserLogin from "../authentication/UserLogin";
import UserSignUp from "../authentication/UserSignUp";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import PrivateUserRoute from "./PrivateUserRoute";
import PublicRoute from "./PublicRoute"; 
import HomePage from "../Home/HomePage";

const Router = () => {
  const appRouter = createBrowserRouter([
    {
      element: <PublicRoute />, // Use PublicRoute here
      children: [
        {
          path: "/",
          element: <UserLogin />,
        },
        {
          path: "/register",
          element: <UserSignUp />,
        },
      ],
    },
    {
      element: <PrivateUserRoute />,
      children: [
        {
          path: "/home",
          element: <HomePage />,
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
