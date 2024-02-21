import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import MyPlansMain from "./pages/MyPlansMain";
import ErrorPage from "./pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MyPlansMain />,
      },
    ],
  },
]);
