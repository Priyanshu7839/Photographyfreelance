import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import BookingPage from "./pages/BookingPage";
import Dashboard from "./pages/Dashboard";
import ProjectDetail from "./pages/ProjectDetail";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/booking",
    Component: BookingPage,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/project/:id",
    Component: ProjectDetail,
  },
]);
