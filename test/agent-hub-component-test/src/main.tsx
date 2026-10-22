import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import "pretendard/dist/web/static/pretendard.css";
import "@fontsource/inter/600.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing application root");
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
