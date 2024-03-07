import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import ImportantPage from "./pages/ImportantPage/ImportantPage";
import MyPlansMain from "./pages/MyPlansMain/MyPlansMain";
import DonePage from "./pages/DonePage/DonePage";
import MyListPage from "./pages/MyListPage/MyListPage";

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
      {
        path: "/important",
        element: <ImportantPage />,
      },
      {
        path: "/done",
        element: <DonePage />,
      },
      {
        path: "/mylist/:name",
        element: <MyListPage />,
      },
    ],
  },
]);
