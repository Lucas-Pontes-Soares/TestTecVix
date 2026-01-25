import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./configs/i18n.ts";
import { RouterProvider } from "react-router-dom";
import { appRoutes } from "./routes/_index.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from 'sonner'
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <ToastContainer theme="colored" />
      <Toaster richColors />
      <RouterProvider
        router={appRoutes}
        future={{ v7_startTransition: true }}
      />
    </QueryClientProvider>
  </>,
);

// Registro do Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/pwa/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registrado com sucesso:", registration);
      })
      .catch((error) => {
        console.error("Erro ao registrar o Service Worker:", error);
      });
  });
}
