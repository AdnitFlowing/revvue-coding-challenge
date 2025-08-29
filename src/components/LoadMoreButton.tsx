/**
 * Load more button for pagination
 */

import { ChevronDown } from "lucide-react";

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  loading?: boolean;
  disabled?: boolean;
  hasMore?: boolean;
}

export const LoadMoreButton = ({
  onLoadMore,
  loading = false,
  disabled = false,
  hasMore = true,
}: LoadMoreButtonProps) => {
  if (!hasMore) {
    return (
      <div style={endMessageContainerStyle}>
        <p style={endMessageStyle}>You've seen all the reviews!</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <button
        onClick={onLoadMore}
        disabled={loading || disabled}
        style={{
          ...buttonStyle,
          opacity: loading || disabled ? 0.6 : 1,
          cursor: loading || disabled ? "not-allowed" : "pointer",
        }}
      >
        {loading ? (
          <>
            <div style={simpleSpinnerStyle}></div>
            Loading more...
          </>
        ) : (
          <>
            <ChevronDown size={18} />
            Load More Reviews
          </>
        )}
      </button>
    </div>
  );
};

// 🎨 CLEAN, SIMPLE STYLING
const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  padding: "2rem 1rem",
};

const buttonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "1rem 2rem",
  background: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  color: "black",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "16px",
  fontSize: "0.875rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 4px 16px rgba(139, 92, 246, 0.2)",

  ":hover": {
    background: "rgba(255, 255, 255, 0.2)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(139, 92, 246, 0.3)",
    borderColor: "rgba(255, 255, 255, 0.3)",
  } as any,

  ":active": {
    transform: "translateY(-1px)",
  } as any,
};

const simpleSpinnerStyle: React.CSSProperties = {
  width: "16px",
  height: "16px",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  borderTop: "2px solid white",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const endMessageContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  padding: "2rem 1rem",
};

const endMessageStyle: React.CSSProperties = {
  color: "#6B7280",
  fontSize: "0.875rem",
  margin: 0,
  textAlign: "center",
};
