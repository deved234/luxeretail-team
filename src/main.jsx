import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          borderRadius: "12px",
          padding: "12px 16px",
        },
        success: {
          style: {
            background: "#E6F7F2",
            color: "#1A9E6E",
            border: "1px solid #1A9E6E20",
          },
          iconTheme: {
            primary: "#1A9E6E",
            secondary: "#fff",
          },
        },
        error: {
          style: {
            background: "#FEF2F2",
            color: "#DC2626",
            border: "1px solid #DC262620",
          },
          iconTheme: {
            primary: "#DC2626",
            secondary: "#fff",
          },
        },
      }}
    />
  </StrictMode>,
);
