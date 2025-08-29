/**
 * Individual review card component with interactive elements
 */

import { Star, Calendar, MapPin, User } from "lucide-react";
import { formatDate } from "../utils/formatters";
import { useState } from "react";

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
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [clickedElement, setClickedElement] = useState<string | null>(null);

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

  const handleElementClick = (element: string) => {
    setClickedElement(element);
    setTimeout(() => setClickedElement(null), 3000);
  };

  return (
    <div style={cardStyle}>
      {/* Glass Morphism Header */}
      <div style={glassHeaderStyle}>
        <div style={avatarContainerStyle}>
          {/* 🔮 GLASS MORPHISM AVATAR */}
          <div
            style={{
              ...avatarStyle,
              ...(hoveredElement === "avatar" ? glassHoverStyle : {}),
              ...(clickedElement === "avatar" ? glassClickStyle : {}),
            }}
            onMouseEnter={() => setHoveredElement("avatar")}
            onMouseLeave={() => setHoveredElement(null)}
            onClick={() => handleElementClick("avatar")}
          >
            <User size={18} style={{ color: "#8B5CF6" }} />
          </div>
          <div>
            <h4 style={reviewerNameStyle}>
              {reviewerName || "Anonymous Customer"}
            </h4>
            <div style={ratingContainerStyle}>
              <div style={starsStyle}>{renderStars(rating)}</div>
              {/* 🔮 GLASS MORPHISM RATING */}
              <span
                style={{
                  ...ratingTextStyle,
                  ...(hoveredElement === "rating" ? glassHoverStyle : {}),
                  ...(clickedElement === "rating" ? glassClickStyle : {}),
                }}
                onMouseEnter={() => setHoveredElement("rating")}
                onMouseLeave={() => setHoveredElement(null)}
                onClick={() => handleElementClick("rating")}
              >
                {rating}.0
              </span>
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
        {/* 🔮 GLASS MORPHISM SOURCE BADGE */}
        <span
          style={{
            ...sourceTagStyle,
            ...(hoveredElement === "source" ? glassHoverStyle : {}),
            ...(clickedElement === "source" ? glassClickStyle : {}),
          }}
          onMouseEnter={() => setHoveredElement("source")}
          onMouseLeave={() => setHoveredElement(null)}
          onClick={() => handleElementClick("source")}
        >
          {source.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

// Card styling
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
};

// Glass morphism header
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
  background: "rgba(139, 92, 246, 0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid rgba(139, 92, 246, 0.15)",
  cursor: "pointer",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
};

const reviewerNameStyle: React.CSSProperties = {
  margin: "0 0 0.5rem 0",
  fontSize: "1.125rem", // Bigger text
  fontWeight: "600",
  color: "#1F2937",
  textAlign: "left", // Left aligned
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
  background: "rgba(139, 92, 246, 0.1)",
  padding: "0.25rem 0.5rem",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  border: "1px solid rgba(139, 92, 246, 0.15)",
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
  fontSize: "1.125rem", // Bigger text
  lineHeight: "1.6",
  color: "#374151",
  fontStyle: "italic",
  fontWeight: "400",
  textAlign: "left", // Left aligned
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
  color: "#8B5CF6",
  background: "rgba(139, 92, 246, 0.1)",
  padding: "0.25rem 0.75rem",
  borderRadius: "12px",
  letterSpacing: "0.5px",
  cursor: "pointer",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  border: "1px solid rgba(139, 92, 246, 0.15)",
};

// Hover effects
const glassHoverStyle: React.CSSProperties = {
  background:
    "linear-gradient(105deg, rgb(76, 62, 247) 24.8649%, rgb(173, 0, 255) 132.583%)",
  borderRadius: "14px",
  boxShadow: "rgba(76, 62, 247, 0.3) 0px 10px 15px -7px",
  opacity: 1,
  willChange: "auto",
  transform: "scale(1.05)",
  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)", // Slower hover
  color: "#FFFFFF", // White text on gradient
};

// Click effects
const glassClickStyle: React.CSSProperties = {
  background:
    "linear-gradient(105deg, rgb(76, 62, 247) 24.8649%, rgb(173, 0, 255) 132.583%)",
  borderRadius: "14px",
  boxShadow: "rgba(76, 62, 247, 0.4) 0px 15px 25px -7px",
  transform: "scale(1.1)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  color: "#FFFFFF", // White text on gradient
  border: "none", // No border on the beautiful gradient
};
