/**
 * Main dashboard component for displaying and managing reviews
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import { SearchBar } from "./SearchBar";
import { ReviewsList } from "./ReviewsList";
import { LoadMoreButton } from "./LoadMoreButton";
import { StatsCard } from "./StatsCard";
import { FilterControls } from "./FilterControls";
import { Star, TrendingUp, MessageCircle } from "lucide-react";

interface Review {
  id: string;
  reviewTime: string;
  rating: number;
  reviewerName?: string;
  reviewText: string;
  source: string;
}

interface ApiResponse {
  dummyReviews: {
    documents: Review[];
    count: number;
  };
}

export const ReviewsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [allReviews, setAllReviews] = useState<Review[]>([]); // Store all fetched reviews
  const [filters, setFilters] = useState({
    minRating: null as number | null,
    maxRating: null as number | null,
    sources: [] as string[],
  });

  // Fetch initial reviews
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async (search?: string, append = false) => {
    try {
      if (!append) setLoading(true);

      const query = search
        ? `query SearchReviews {
             dummyReviews(freeText: "${search}", limit: 10) {
               documents {
                 id
                 reviewTime
                 rating
                 reviewerName
                 reviewText
                 source
               }
               count
             }
           }`
        : `query GetReviews {
             dummyReviews(limit: ${append ? 50 : 15}) {
               documents {
                 id
                 reviewTime
                 rating
                 reviewerName
                 reviewText
                 source
               }
               count
             }
           }`;

      const response = await fetch("https://app.revvue.ai/graphql/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
      }

      const data: ApiResponse = result.data;

      if (append) {
        const newReviews = [...allReviews, ...data.dummyReviews.documents];
        setAllReviews(newReviews);
        // Don't update reviews here - let filteredReviews handle display
      } else {
        setAllReviews(data.dummyReviews.documents);
        // Don't update reviews here - let filteredReviews handle display
      }

      setTotalCount(data.dummyReviews.count);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);

    // Only make API call if term is different and meaningful
    if (term.trim() && term.trim().length >= 2) {
      fetchReviews(term.trim());
    } else if (term.trim() === "") {
      fetchReviews();
    }
    // Ignore searches with less than 2 characters to prevent spam
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
    fetchReviews();
  }, []);

  const handleLoadMore = () => {
    // First, try to show more from already loaded reviews
    if (hasMoreToDisplay) {
      setDisplayLimit((prev) => prev + 5);
    } else if (hasMoreFromApi) {
      // If we've shown all loaded reviews, fetch more from API
      fetchReviews(searchTerm || undefined, true);
    }
  };

  // Handle KPI card clicks with enhanced glass morphism
  const handleCardClick = useCallback((cardId: string) => {
    setActiveCard(cardId);

    // Reset after 4 seconds for longer enjoyment of the effect
    setTimeout(() => {
      setActiveCard(null);
    }, 4000);
  }, []);

  // Handle filter changes with smart filtering
  const handleFilterChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
  }, []);

  // Client-side pagination state
  const [displayLimit, setDisplayLimit] = useState(5);

  // Smart filtering logic - filter client-side for better performance
  const filteredReviews = useMemo(() => {
    let filtered = searchTerm
      ? allReviews.filter(
          (review) =>
            review.reviewText
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            review.reviewerName
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            review.source.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : allReviews;

    // Apply rating filter
    if (filters.minRating) {
      filtered = filtered.filter(
        (review) => review.rating >= filters.minRating!
      );
    }

    // Apply source filter
    if (filters.sources.length > 0) {
      filtered = filtered.filter((review) =>
        filters.sources.includes(review.source)
      );
    }

    // Apply display limit for pagination
    return filtered.slice(0, displayLimit);
  }, [allReviews, searchTerm, filters, displayLimit]);

  // Get available sources for filter dropdown
  const availableSources = useMemo(() => {
    const sources = Array.from(
      new Set(allReviews.map((review) => review.source))
    );
    return sources.sort();
  }, [allReviews]);

  // Check if there are more reviews to display (either from API or locally)
  const hasMoreFromApi = allReviews.length < totalCount;
  const hasMoreToDisplay = displayLimit < allReviews.length;
  const hasMore = hasMoreFromApi || hasMoreToDisplay;

  // Load More logic: Show more reviews from already loaded data first,
  // then fetch more from API if needed

  // Calculate stats for glass morphism cards based on filtered results
  const averageRating = useMemo(() => {
    return filteredReviews.length > 0
      ? (
          filteredReviews.reduce((sum, review) => sum + review.rating, 0) /
          filteredReviews.length
        ).toFixed(1)
      : "0.0";
  }, [filteredReviews]);

  return (
    <div style={dashboardStyle}>
      {/* Clean Dashboard Title */}
      <div style={titleContainerStyle}>
        <h1 style={mainTitleStyle}>Revvue Reviews Dashboard</h1>
        <p style={mainSubtitleStyle}>Discover what customers are saying</p>
      </div>

      {/* Glass Morphism Stats Cards */}
      <div style={statsContainerStyle}>
        <StatsCard
          title="Total Reviews"
          value={totalCount}
          subtitle="All time"
          onClick={() => handleCardClick("total")}
          isActive={activeCard === "total"}
          icon={
            <MessageCircle
              size={18}
              style={{ color: "rgba(255, 255, 255, 0.9)" }}
            />
          }
        />
        <StatsCard
          title="Average Rating"
          value={`${averageRating} ⭐`}
          subtitle="Filtered results"
          onClick={() => handleCardClick("rating")}
          isActive={activeCard === "rating"}
          icon={
            <Star size={18} style={{ color: "rgba(255, 255, 255, 0.9)" }} />
          }
        />
        <StatsCard
          title="Showing"
          value={filteredReviews.length}
          subtitle={
            searchTerm || filters.minRating || filters.sources.length > 0
              ? "Filtered results"
              : "All reviews"
          }
          onClick={() => handleCardClick("showing")}
          isActive={activeCard === "showing"}
          icon={
            <TrendingUp
              size={18}
              style={{ color: "rgba(255, 255, 255, 0.9)" }}
            />
          }
        />
      </div>

      {/* Glass Morphism Search Bar */}
      <SearchBar
        onSearch={handleSearch}
        onClear={handleClearSearch}
        placeholder="Search reviews by content, reviewer, or source..."
        isLoading={loading}
      />

      {/* Advanced Filter Controls */}
      <FilterControls
        onFilterChange={handleFilterChange}
        availableSources={availableSources}
        isLoading={loading}
      />

      {/* Reviews List with Filtered Results */}
      <ReviewsList
        reviews={filteredReviews}
        loading={loading && allReviews.length === 0}
        error={error}
        emptyMessage={
          searchTerm || filters.minRating || filters.sources.length > 0
            ? "No reviews match your filters"
            : "No reviews available"
        }
      />

      {/* Load More Button - Always show for demo if there are more reviews */}
      {hasMore && (
        <LoadMoreButton
          onLoadMore={handleLoadMore}
          loading={loading}
          hasMore={hasMore}
        />
      )}
    </div>
  );
};

const dashboardStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "transparent", // Let the light background from index.css show through
  paddingBottom: "2rem",
  paddingTop: "0", // No top padding since header handles its own spacing
};

const titleContainerStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "3rem 1rem 2rem",
};

const mainTitleStyle: React.CSSProperties = {
  fontSize: "2.5rem",
  fontWeight: "800",
  background:
    "linear-gradient(105deg, rgb(76, 62, 247) 24.8649%, rgb(219, 0, 255) 132.583%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  margin: "0 0 0.5rem 0",
  textAlign: "center",
};

const mainSubtitleStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  color: "#6B7280",
  margin: 0,
  fontWeight: "300",
  textAlign: "center",
};

const statsContainerStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "1rem",
  padding: "0 1rem 2rem",
  maxWidth: "800px",
  margin: "0 auto",
};
