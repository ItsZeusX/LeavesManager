import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import storeContext, { StoreProvider } from "./contexts/Store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </StoreProvider>
  </React.StrictMode>
);
