import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RankingPage from "./pages/RankingPage";
import RulesPage from "./pages/RulesPage";
import Page from "./components/Page";
import GithubAuth from "./pages/GithubAuth";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Page content={<HomePage />} />
  },
  {
    path: '/ranking',
    element: <Page content={<RankingPage />} />
  },
  {
    path: '/rules',
    element: <Page content={<RulesPage />} />
  },
  {
    path: '/login',
    element: <Page content={<LoginPage />} />
  },
  {
    path: '/github-auth',
    element: <Page content={<GithubAuth />} />
  }
]);