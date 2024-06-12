import { createBrowserRouter } from "react-router-dom";

import RankingPage from "../pages/RankingPage";
import RulesPage from "../pages/RulesPage/RulesPage";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/ranking',
        element: <RankingPage />
      },
      {
        path: '/rules',
        element: <RulesPage />
      },
    ],
  },
]);