/**
 * Main Reviews Dashboard Component
 * Combines all UI components into a beautiful, cohesive interface
 */

import { useState, useEffect, useCallback } from "react";
import { SearchBar } from "./SearchBar";
import { ReviewsList } from "./ReviewsList";
import { LoadMoreButton } from "./LoadMoreButton";
import { StatsCard } from "./StatsCard";
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
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCount, setTotalCount] = useState(0);

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
             dummyReviews(limit: ${append ? 20 : 5}) {
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
        setReviews((prev) => [...prev, ...data.dummyReviews.documents]);
      } else {
        setReviews(data.dummyReviews.documents);
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
    fetchReviews(searchTerm || undefined, true);
  };

  const hasMore = reviews.length < totalCount;

  // Calculate stats for glass morphism cards
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div style={dashboardStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Revvue Reviews Dashboard</h1>
        <p style={subtitleStyle}>Discover what customers are saying ✨</p>
      </div>

      {/* Glass Morphism Stats Cards */}
      <div style={statsContainerStyle}>
        <StatsCard
          title="Total Reviews"
          value={totalCount}
          subtitle="All time"
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
          subtitle="Current display"
          icon={
            <Star size={18} style={{ color: "rgba(255, 255, 255, 0.9)" }} />
          }
        />
        <StatsCard
          title="Showing"
          value={reviews.length}
          subtitle={
            searchTerm ? `Results for "${searchTerm}"` : "Recent reviews"
          }
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

      {/* Reviews List */}
      <ReviewsList
        reviews={reviews}
        loading={loading && reviews.length === 0}
        error={error}
        emptyMessage={
          searchTerm
            ? `No reviews found for "${searchTerm}"`
            : "No reviews available"
        }
      />

      {/* Load More Button */}
      {reviews.length > 0 && (
        <LoadMoreButton
          onLoadMore={handleLoadMore}
          loading={loading}
          hasMore={hasMore}
        />
      )}
    </div>
  );
};

// 🎨 STUNNING DASHBOARD STYLING
const dashboardStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "transparent", // Let the gradient from index.css show through
  paddingBottom: "2rem",
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "3rem 1rem 1rem",
};

const statsContainerStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "1rem",
  padding: "0 1rem 2rem",
  maxWidth: "800px",
  margin: "0 auto",
};

const titleStyle: React.CSSProperties = {
  fontSize: "2.5rem",
  fontWeight: "800",
  color: "rgba(255, 255, 255, 0.95)",
  margin: "0 0 0.5rem 0",
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  color: "rgba(255, 255, 255, 0.8)",
  margin: 0,
  fontWeight: "300",
};
