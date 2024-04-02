import { createBrowserRouter } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RankingPage from "./pages/RankingPage";
import RulesPage from "./pages/RulesPage";
import GithubAuth from "./pages/GithubAuth";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

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
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/github-auth',
        element: <GithubAuth />
      }
    ],
  },
]);