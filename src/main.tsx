import { createRoot, hydrateRoot } from "react-dom/client";
import { AppShell } from "./AppShell";
import { checkIsAdminAuthenticated } from "./utils/auth";
import "./index.css";

const root = document.getElementById("root")!;
const params = new URLSearchParams(window.location.search);
const isLanding =
  window.location.pathname === "/" &&
  !params.has("r") &&
  (!params.has("p") || params.get("p") === "landing");
if (
  root.querySelector(".phx-landing") &&
  isLanding &&
  !checkIsAdminAuthenticated()
) {
  hydrateRoot(root, <AppShell />);
} else {
  createRoot(root).render(<AppShell />);
}
