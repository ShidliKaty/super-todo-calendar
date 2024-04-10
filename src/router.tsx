import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";

import { MyListPage } from "./pages/MyListPage";
import { DonePage } from "./pages/DonePage";
import { ImportantPage } from "./pages/ImportantPage";
import { MyPlansMain } from "./pages/MyPlansMain";
import { MyMiniListPage } from "./pages/MyMiniListPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "plans",
        element: <MyPlansMain />,
      },
      {
        path: "important",
        element: <ImportantPage />,
      },
      {
        path: "done",
        element: <DonePage />,
      },
      {
        path: "mylist/:id",
        element: <MyListPage />,
      },
      {
        path: "my_mini_list/:id",
        element: <MyMiniListPage />,
      },
    ],
  },
]);
