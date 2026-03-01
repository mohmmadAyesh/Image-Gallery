import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import GallaryPage from "./GallaryPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/gallary", element: <GallaryPage /> },
]);
import { GallaryProvider } from "./Context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GallaryProvider>
      <RouterProvider router={router} />
    </GallaryProvider>
    <Toaster position="top-right" reverseOrder={false} />
  </StrictMode>,
);
