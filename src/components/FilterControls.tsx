/**
 * Filter controls for rating and source filtering
 */

import { useState } from "react";
import { Filter, Star, RotateCcw, ChevronDown } from "lucide-react";

interface FilterState {
  minRating: number | null;
  maxRating: number | null;
  sources: string[];
}

interface FilterControlsProps {
  onFilterChange: (filters: FilterState) => void;
  availableSources: string[];
  isLoading?: boolean;
}

export const FilterControls = ({
  onFilterChange,
  availableSources,
  isLoading = false,
}: FilterControlsProps) => {
  const [filters, setFilters] = useState<FilterState>({
    minRating: null,
    maxRating: null,
    sources: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const handleRatingFilter = (min: number | null, max: number | null) => {
    const newFilters = { ...filters, minRating: min, maxRating: max };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSourceToggle = (source: string) => {
    const newSources = filters.sources.includes(source)
      ? filters.sources.filter((s) => s !== source)
      : [...filters.sources, source];

    const newFilters = { ...filters, sources: newSources };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = { minRating: null, maxRating: null, sources: [] };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters =
    filters.minRating || filters.maxRating || filters.sources.length > 0;

  return (
    <div style={containerStyle}>
      {/* Filter Toggle Button */}
      <div style={filterToggleContainerStyle}>
        <button
          onClick={() => setShowFilters(!showFilters)}
          onMouseEnter={() => setHoveredButton("filterToggle")}
          onMouseLeave={() => setHoveredButton(null)}
          style={{
            ...filterToggleStyle,
            ...(hoveredButton === "filterToggle" && filterToggleHoverStyle),
            background: hasActiveFilters
              ? "linear-gradient(105deg, rgb(76, 62, 247) 24.8649%, rgb(173, 0, 255) 132.583%)"
              : filterToggleStyle.background,
            color: hasActiveFilters ? "#FFFFFF" : "#8B5CF6",
          }}
          disabled={isLoading}
        >
          <Filter size={18} />
          <span>Filters</span>
          {hasActiveFilters && (
            <span style={badgeStyle}>
              {(filters.minRating || filters.maxRating ? 1 : 0) +
                filters.sources.length}
            </span>
          )}
          <ChevronDown
            size={16}
            style={{
              transform: showFilters ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </button>

        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            onMouseEnter={() => setHoveredButton("clearFilters")}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              ...clearFiltersStyle,
              ...(hoveredButton === "clearFilters" && clearFiltersHoverStyle),
            }}
            disabled={isLoading}
          >
            <RotateCcw size={16} />
            Clear
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div style={filterPanelStyle}>
          {/* Rating Filter */}
          <div style={filterSectionStyle}>
            <h4 style={filterTitleStyle}>Rating</h4>
            <div style={ratingFilterStyle}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingFilter(rating, 5)}
                  onMouseEnter={() => setHoveredButton(`rating-${rating}`)}
                  onMouseLeave={() => setHoveredButton(null)}
                  style={{
                    ...ratingButtonStyle,
                    ...(hoveredButton === `rating-${rating}` &&
                      ratingButtonHoverStyle),
                    background:
                      filters.minRating === rating
                        ? "linear-gradient(105deg, rgb(76, 62, 247) 24.8649%, rgb(173, 0, 255) 132.583%)"
                        : ratingButtonStyle.background,
                    color: filters.minRating === rating ? "#FFFFFF" : "#8B5CF6",
                  }}
                  disabled={isLoading}
                >
                  <Star size={14} />
                  <span>{rating}+ Stars</span>
                </button>
              ))}
            </div>
          </div>

          {/* Source Filter */}
          <div style={filterSectionStyle}>
            <h4 style={filterTitleStyle}>Sources</h4>
            <div style={sourceFilterStyle}>
              {availableSources.map((source) => (
                <button
                  key={source}
                  onClick={() => handleSourceToggle(source)}
                  onMouseEnter={() => setHoveredButton(`source-${source}`)}
                  onMouseLeave={() => setHoveredButton(null)}
                  style={{
                    ...sourceButtonStyle,
                    ...(hoveredButton === `source-${source}` &&
                      sourceButtonHoverStyle),
                    background: filters.sources.includes(source)
                      ? "linear-gradient(105deg, rgb(76, 62, 247) 24.8649%, rgb(173, 0, 255) 132.583%)"
                      : sourceButtonStyle.background,
                    color: filters.sources.includes(source)
                      ? "#FFFFFF"
                      : "#8B5CF6",
                  }}
                  disabled={isLoading}
                >
                  {source}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  maxWidth: "800px",
  margin: "0 auto 2rem",
  padding: "0 1rem",
};

const filterToggleContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "1rem",
};

const filterToggleStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.75rem 1.5rem",
  background: "#FFFFFF",
  border: "2px solid rgba(139, 92, 246, 0.2)",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "0.875rem",
  fontWeight: "500",
  color: "#8B5CF6",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 4px 16px rgba(139, 92, 246, 0.08)",
};

const filterToggleHoverStyle: React.CSSProperties = {
  border: "2px solid rgba(139, 92, 246, 0.3)",
  transform: "translateY(-1px)",
  boxShadow: "0 8px 24px rgba(139, 92, 246, 0.12)",
};

const badgeStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.3)",
  borderRadius: "10px",
  padding: "0.125rem 0.375rem",
  fontSize: "0.75rem",
  fontWeight: "600",
};

const clearFiltersStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
  padding: "0.5rem 1rem",
  background: "rgba(220, 38, 38, 0.1)",
  border: "1px solid rgba(220, 38, 38, 0.2)",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "0.75rem",
  fontWeight: "500",
  color: "#DC2626",
  transition: "all 0.3s ease",
};

const clearFiltersHoverStyle: React.CSSProperties = {
  background: "rgba(220, 38, 38, 0.15)",
};

// 🔮 WHITE BACKGROUND FILTER PANEL WITH GLASS MORPHISM OUTLINE
const filterPanelStyle: React.CSSProperties = {
  background: "#FFFFFF",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "2px solid rgba(139, 92, 246, 0.15)",
  borderRadius: "16px",
  padding: "1.5rem",
  boxShadow: "0 8px 32px rgba(139, 92, 246, 0.08)",
  animation: "slideDown 0.3s ease-out",
};

const filterSectionStyle: React.CSSProperties = {
  marginBottom: "1.5rem",
};

const filterTitleStyle: React.CSSProperties = {
  fontSize: "0.875rem",
  fontWeight: "600",
  color: "#374151",
  margin: "0 0 0.75rem 0",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const ratingFilterStyle: React.CSSProperties = {
  display: "flex",
  gap: "0.5rem",
  flexWrap: "wrap",
};

const ratingButtonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
  padding: "0.5rem 0.75rem",
  background: "#FFFFFF",
  border: "1px solid rgba(139, 92, 246, 0.2)",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "0.75rem",
  fontWeight: "500",
  color: "#8B5CF6",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 8px rgba(139, 92, 246, 0.05)",
};

const ratingButtonHoverStyle: React.CSSProperties = {
  border: "1px solid rgba(139, 92, 246, 0.3)",
  boxShadow: "0 4px 12px rgba(139, 92, 246, 0.1)",
  transform: "translateY(-1px)",
};

const sourceFilterStyle: React.CSSProperties = {
  display: "flex",
  gap: "0.5rem",
  flexWrap: "wrap",
};

const sourceButtonStyle: React.CSSProperties = {
  padding: "0.5rem 1rem",
  background: "#FFFFFF",
  border: "1px solid rgba(139, 92, 246, 0.2)",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "0.75rem",
  fontWeight: "500",
  color: "#8B5CF6",
  transition: "all 0.3s ease",
  boxShadow: "0 2px 8px rgba(139, 92, 246, 0.05)",
};

const sourceButtonHoverStyle: React.CSSProperties = {
  border: "1px solid rgba(139, 92, 246, 0.3)",
  boxShadow: "0 4px 12px rgba(139, 92, 246, 0.1)",
  transform: "translateY(-1px)",
};
