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
  const [activeCard, setActiveCard] = useState<string | null>(null);

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

  // Handle KPI card clicks with enhanced glass morphism
  const handleCardClick = useCallback((cardId: string) => {
    setActiveCard(cardId);

    // Reset after 4 seconds for longer enjoyment of the effect
    setTimeout(() => {
      setActiveCard(null);
    }, 4000);
  }, []);

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
          subtitle="Current display"
          onClick={() => handleCardClick("rating")}
          isActive={activeCard === "rating"}
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
  background: "transparent", // Let the light background from index.css show through
  paddingBottom: "2rem",
  paddingTop: "0", // No top padding since header handles its own spacing
};

// 🎨 CLEAN TITLE STYLING
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
