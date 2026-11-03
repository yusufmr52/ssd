import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { manropeFontDataUri } from "./assets/embedded";
import App from "./App";

const fontStyle = document.createElement("style");
fontStyle.setAttribute("data-hutaib-font", "manrope");
fontStyle.textContent = `@font-face{font-family:"Manrope";font-style:normal;font-weight:400 800;font-display:swap;src:url("${manropeFontDataUri}") format("woff2");}`;
document.head.appendChild(fontStyle);


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
