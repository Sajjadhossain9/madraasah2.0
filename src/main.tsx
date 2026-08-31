import { Component, StrictMode, type ErrorInfo, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

type ErrorBoundaryProps = { children: ReactNode };
type ErrorBoundaryState = { hasError: boolean };

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Application startup/render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "24px", background: "#f8fafc", color: "#0f172a", fontFamily: "system-ui, sans-serif" }}>
          <section style={{ maxWidth: "620px", textAlign: "center", background: "white", border: "1px solid #d1fae5", borderRadius: "18px", padding: "28px", boxShadow: "0 10px 30px rgba(15,23,42,.08)" }}>
            <h1 style={{ margin: "0 0 10px", color: "#065f46", fontSize: "24px" }}>Madrasah Darul Huda</h1>
            <p style={{ margin: "0 0 18px", lineHeight: 1.6 }}>The website could not start correctly in this browser. Please reload the page. If the problem continues, make sure JavaScript is allowed for this site.</p>
            <button onClick={() => window.location.reload()} style={{ border: 0, borderRadius: "10px", padding: "11px 18px", background: "#047857", color: "white", fontWeight: 700, cursor: "pointer" }}>
              Reload website
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
