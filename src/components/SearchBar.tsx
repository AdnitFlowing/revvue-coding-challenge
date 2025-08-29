/**
 * Search bar component with auto-focus and debounced search
 */

import { Search, X } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";

interface SearchBarProps {
  onSearch: (term: string) => void;
  onClear: () => void;
  placeholder?: string;
  isLoading?: boolean;
}

export const SearchBar = ({
  onSearch,
  onClear,
  placeholder = "Search reviews...",
  isLoading = false,
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search - only call API when user stops typing for 500ms
  useEffect(() => {
    if (searchTerm === "") {
      // Clear search immediately when empty
      onSearch("");
      return;
    }

    const timeoutId = setTimeout(() => {
      onSearch(searchTerm);
    }, 500); // Longer delay to prevent spam

    return () => clearTimeout(timeoutId);
  }, [searchTerm, onSearch]);

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    // Don't call onSearch immediately - let useEffect handle it
  };

  // Auto-focus input on mount and maintain focus during search
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Maintain focus after search results load
  useEffect(() => {
    if (inputRef.current && searchTerm && !isLoading) {
      // Re-focus after search completes, but only if user was typing
      const focusTimeout = setTimeout(() => {
        if (inputRef.current && document.activeElement !== inputRef.current) {
          inputRef.current.focus();
          // Restore cursor position to end
          const length = inputRef.current.value.length;
          inputRef.current.setSelectionRange(length, length);
        }
      }, 50);

      return () => clearTimeout(focusTimeout);
    }
  }, [isLoading, searchTerm]);

  const handleClear = useCallback(() => {
    setSearchTerm("");
    onClear();
    // Refocus input after clearing
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, [onClear]);

  return (
    <div style={containerStyle}>
      <div style={glassSearchBarStyle}>
        <Search size={20} style={searchIconStyle} />

        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          autoFocus
          style={{
            ...inputStyle,
            opacity: isLoading ? 0.6 : 1,
          }}
        />

        {searchTerm && (
          <button
            onClick={handleClear}
            style={clearButtonStyle}
            disabled={isLoading}
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

// 🌟 GLASS MORPHISM STYLES - This will absolutely stand out!
const containerStyle: React.CSSProperties = {
  padding: "1rem",
  display: "flex",
  justifyContent: "center",
  position: "relative",
};

const glassSearchBarStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  padding: "1rem 1.5rem",
  width: "100%",
  maxWidth: "500px",

  // 🔮 WHITE BACKGROUND WITH GLASS MORPHISM OUTLINE
  background: "#FFFFFF",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)", // Safari support
  border: "2px solid rgba(139, 92, 246, 0.2)",
  borderRadius: "20px",
  boxShadow: `
    0 8px 32px rgba(139, 92, 246, 0.08),
    inset 0 1px 0 rgba(139, 92, 246, 0.05)
  `,

  // Smooth transitions
  transition: "all 0.3s ease",
  cursor: "text",

  // Focus styles handled by input focus management
};

const searchIconStyle: React.CSSProperties = {
  color: "#8B5CF6",
  flexShrink: 0,
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  background: "transparent",
  border: "none",
  outline: "none",
  fontSize: "1rem",
  color: "#1F2937",
  fontWeight: "500",

  // Placeholder styling
  "::placeholder": {
    color: "#9CA3AF",
  } as any,
};

const clearButtonStyle: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid rgba(139, 92, 246, 0.2)",
  borderRadius: "50%",
  padding: "0.5rem",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#8B5CF6",
  transition: "all 0.2s ease",
  boxShadow: "0 2px 8px rgba(139, 92, 246, 0.08)",

  ":hover": {
    border: "1px solid rgba(139, 92, 246, 0.3)",
    boxShadow: "0 4px 12px rgba(139, 92, 246, 0.15)",
    transform: "scale(1.05)",
  } as any,
};
