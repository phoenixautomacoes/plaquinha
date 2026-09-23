import { StrictMode, Suspense } from "react";
import App from "./App";

export function AppShell() {
  return (
    <StrictMode>
      <Suspense
        fallback={
          <div
            role="status"
            className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-700"
          >
            Carregando…
          </div>
        }
      >
        <App />
      </Suspense>
    </StrictMode>
  );
}
