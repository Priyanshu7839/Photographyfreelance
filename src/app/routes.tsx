import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import BookingPage from "./pages/BookingPage";
import Dashboard from "./pages/Dashboard";
import ProjectDetail from "./pages/ProjectDetail";
import WorkspaceGateway from "./pages/WorkspaceGateway";
import ClientLogin from "./pages/ClientLogin";
import TeamLogin from "./pages/TeamLogin";
import AdminLogin from "./pages/AdminLogin";
import WeddingPackageBuilder from "./pages/WeddingPackageBuilder";
import ClientOnboarding from "./pages/ClientOnboarding";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/wedding-builder",
    Component: WeddingPackageBuilder,
  },
  {
    path: "/booking",
    Component: BookingPage,
  },
  {
    path: "/workspace",
    Component: WorkspaceGateway,
  },
  {
    path: "/login/client",
    Component: ClientLogin,
  },
  {
    path: "/login/team",
    Component: TeamLogin,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/onboarding",
    Component: ClientOnboarding,
  },
  {
    path: "/project/:clientId",
    Component: ProjectDetail,
  },
]);
