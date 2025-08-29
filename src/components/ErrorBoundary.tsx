/**
 * Error boundary for graceful error handling
 */

import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={errorContainerStyle}>
          <div style={errorContentStyle}>
            <h2 style={errorTitleStyle}>Oops! Something went wrong</h2>
            <p style={errorMessageStyle}>
              We encountered an unexpected error. Please refresh the page to try
              again.
            </p>
            <button
              style={retryButtonStyle}
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>

            {process.env.NODE_ENV === "development" && (
              <details style={errorDetailsStyle}>
                <summary style={errorSummaryStyle}>
                  Error Details (Development)
                </summary>
                <pre style={errorPreStyle}>
                  {this.state.error?.message}
                  {"\n"}
                  {this.state.error?.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

//  ERROR BOUNDARY STYLING
const errorContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: "2rem",
  background: "#F8FAFC",
};

const errorContentStyle: React.CSSProperties = {
  textAlign: "center",
  maxWidth: "500px",
  background: "#FFFFFF",
  padding: "3rem 2rem",
  borderRadius: "16px",
  border: "2px solid rgba(220, 38, 38, 0.2)",
  boxShadow: "0 8px 32px rgba(220, 38, 38, 0.08)",
};

const errorTitleStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: "700",
  color: "#DC2626",
  margin: "0 0 1rem 0",
};

const errorMessageStyle: React.CSSProperties = {
  fontSize: "1rem",
  color: "#6B7280",
  lineHeight: "1.6",
  margin: "0 0 2rem 0",
};

const retryButtonStyle: React.CSSProperties = {
  background:
    "linear-gradient(105deg, rgb(76, 62, 247) 24.8649%, rgb(173, 0, 255) 132.583%)",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "8px",
  padding: "0.75rem 1.5rem",
  fontSize: "0.875rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const errorDetailsStyle: React.CSSProperties = {
  marginTop: "2rem",
  textAlign: "left",
};

const errorSummaryStyle: React.CSSProperties = {
  cursor: "pointer",
  fontSize: "0.875rem",
  fontWeight: "600",
  color: "#8B5CF6",
  marginBottom: "1rem",
};

const errorPreStyle: React.CSSProperties = {
  background: "#F3F4F6",
  padding: "1rem",
  borderRadius: "8px",
  fontSize: "0.75rem",
  color: "#374151",
  overflow: "auto",
  maxHeight: "200px",
};
