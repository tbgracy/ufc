import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RankingPage from "./pages/RankingPage";
import RulesPage from "./pages/RulesPage";

export const router = createBrowserRouter([
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
]);