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
import DetailPage from "../Home/DetailPage";
import Weather from "../Home/Weather";

const Router = () => {
  const appRouter = createBrowserRouter([
    {
      element: <PublicRoute />,
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
        {
          path: "/details",
          element: <DetailPage />,
        },
        {
          path: "/weather",
          element: <Weather />,
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
