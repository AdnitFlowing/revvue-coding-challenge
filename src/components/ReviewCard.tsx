/**
 * Professional Review Card Component
 * Modern pastel purple brand identity with glass morphism accents
 */

import { Star, Calendar, MapPin, User } from "lucide-react";
import { formatDate } from "../utils/formatters";

interface ReviewCardProps {
  id: string;
  reviewTime: string;
  rating: number;
  reviewerName?: string;
  reviewText: string;
  source: string;
}

export const ReviewCard = ({
  reviewTime,
  rating,
  reviewerName,
  reviewText,
  source,
}: ReviewCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        style={{
          color: i < rating ? "#F59E0B" : "#E5E7EB",
          fill: i < rating ? "#F59E0B" : "transparent",
        }}
      />
    ));
  };

  return (
    <div style={cardStyle}>
      {/* Glass Morphism Header */}
      <div style={glassHeaderStyle}>
        <div style={avatarContainerStyle}>
          <div style={avatarStyle}>
            <User size={18} style={{ color: "#8B5CF6" }} />
          </div>
          <div>
            <h4 style={reviewerNameStyle}>
              {reviewerName || "Anonymous Customer"}
            </h4>
            <div style={ratingContainerStyle}>
              <div style={starsStyle}>{renderStars(rating)}</div>
              <span style={ratingTextStyle}>{rating}.0</span>
            </div>
          </div>
        </div>

        <div style={metaInfoStyle}>
          <div style={metaItemStyle}>
            <Calendar size={12} style={iconStyle} />
            <span>{formatDate(reviewTime)}</span>
          </div>
          <div style={metaItemStyle}>
            <MapPin size={12} style={iconStyle} />
            <span>{source}</span>
          </div>
        </div>
      </div>

      {/* Review Content with Pastel Background */}
      <div style={contentStyle}>
        <p style={reviewTextStyle}>"{reviewText}"</p>
      </div>

      {/* Glass Morphism Footer */}
      <div style={glassFooterStyle}>
        <span style={sourceTagStyle}>{source.toUpperCase()}</span>
      </div>
    </div>
  );
};

// 🎨 STUNNING PASTEL PURPLE BRAND STYLING
const cardStyle: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #F3E8FF",
  borderRadius: "20px",
  padding: "0",
  marginBottom: "1.5rem",
  boxShadow:
    "0 4px 20px rgba(139, 92, 246, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

  ":hover": {
    boxShadow:
      "0 8px 32px rgba(139, 92, 246, 0.15), 0 2px 6px rgba(0, 0, 0, 0.08)",
    transform: "translateY(-2px)",
    borderColor: "#E9D5FF",
  } as any,
};

// 🔮 GLASS MORPHISM HEADER
const glassHeaderStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "none",
  borderBottom: "1px solid rgba(233, 213, 255, 0.3)",
  padding: "1.5rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "1rem",
};

const avatarContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "0.75rem",
  flex: 1,
};

const avatarStyle: React.CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #E9D5FF",
};

const reviewerNameStyle: React.CSSProperties = {
  margin: "0 0 0.5rem 0",
  fontSize: "1rem",
  fontWeight: "600",
  color: "#1F2937",
};

const ratingContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

const starsStyle: React.CSSProperties = {
  display: "flex",
  gap: "2px",
};

const ratingTextStyle: React.CSSProperties = {
  fontSize: "0.875rem",
  fontWeight: "600",
  color: "#8B5CF6",
  background: "#F3E8FF",
  padding: "0.25rem 0.5rem",
  borderRadius: "6px",
};

const metaInfoStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
  alignItems: "flex-end",
};

const metaItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
  fontSize: "0.75rem",
  color: "rgba(255, 255, 255, 0.8)",
  fontWeight: "500",
};

const iconStyle: React.CSSProperties = {
  color: "rgba(255, 255, 255, 0.7)",
};

const contentStyle: React.CSSProperties = {
  padding: "1.5rem",
  background: "linear-gradient(135deg, #FEFBFF 0%, #F9FAFB 100%)",
};

const reviewTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "1rem",
  lineHeight: "1.6",
  color: "#374151",
  fontStyle: "italic",
  fontWeight: "400",
};

// 🔮 GLASS MORPHISM FOOTER
const glassFooterStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  padding: "0.75rem 1.5rem",
  display: "flex",
  justifyContent: "flex-end",
};

const sourceTagStyle: React.CSSProperties = {
  fontSize: "0.625rem",
  fontWeight: "600",
  color: "rgba(255, 255, 255, 0.9)",
  background: "rgba(139, 92, 246, 0.2)",
  padding: "0.25rem 0.75rem",
  borderRadius: "12px",
  letterSpacing: "0.5px",
};
