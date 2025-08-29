/**
 * Container component for displaying list of reviews
 */

import { ReviewCard } from "./ReviewCard";

interface Review {
  id: string;
  reviewTime: string;
  rating: number;
  reviewerName?: string;
  reviewText: string;
  source: string;
}

interface ReviewsListProps {
  reviews: Review[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
}

export const ReviewsList = ({
  reviews,
  loading = false,
  error = null,
  emptyMessage = "No reviews found.",
}: ReviewsListProps) => {
  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <div style={loadingSpinnerStyle}>
          <div style={spinnerStyle}></div>
          <p style={loadingTextStyle}>Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={errorContainerStyle}>
        <div style={errorIconStyle}>⚠️</div>
        <h3 style={errorTitleStyle}>Unable to load reviews</h3>
        <p style={errorMessageStyle}>{error}</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div style={emptyContainerStyle}>
        <h3 style={emptyTitleStyle}>No Reviews Yet</h3>
        <p style={emptyMessageStyle}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Customer Reviews ({reviews.length})</h2>
      </div>

      <div style={listStyle}>
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            id={review.id}
            reviewTime={review.reviewTime}
            rating={review.rating}
            reviewerName={review.reviewerName}
            reviewText={review.reviewText}
            source={review.source}
          />
        ))}
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "0 1rem",
};

const headerStyle: React.CSSProperties = {
  marginBottom: "1.5rem",
  textAlign: "center",
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: "700",
  color: "#1F2937",
  margin: 0,
};

const listStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0",
};

// Loading States
const loadingContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "3rem",
};

const loadingSpinnerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
};

const spinnerStyle: React.CSSProperties = {
  width: "32px",
  height: "32px",
  border: "3px solid #E5E7EB",
  borderTop: "3px solid #3B82F6",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const loadingTextStyle: React.CSSProperties = {
  color: "#6B7280",
  fontSize: "0.875rem",
  margin: 0,
};

// Error States
const errorContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "3rem 1rem",
  textAlign: "center",
};

const errorIconStyle: React.CSSProperties = {
  fontSize: "2rem",
  marginBottom: "1rem",
};

const errorTitleStyle: React.CSSProperties = {
  fontSize: "1.25rem",
  fontWeight: "600",
  color: "#DC2626",
  margin: "0 0 0.5rem 0",
};

const errorMessageStyle: React.CSSProperties = {
  color: "#6B7280",
  fontSize: "0.875rem",
  margin: 0,
};

// Empty States
const emptyContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "3rem 1rem",
  textAlign: "center",
};

const emptyTitleStyle: React.CSSProperties = {
  fontSize: "1.25rem",
  fontWeight: "600",
  color: "#6B7280",
  margin: "0 0 0.5rem 0",
};

const emptyMessageStyle: React.CSSProperties = {
  color: "#9CA3AF",
  fontSize: "0.875rem",
  margin: 0,
};
