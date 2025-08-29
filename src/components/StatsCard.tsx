/**
 * Interactive statistics card component
 */

import { useState } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

export const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  onClick,
  isActive = false,
}: StatsCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...cardStyle,
        ...(isActive ? activeCardStyle : {}),
        ...(isHovered && !isActive ? hoverCardStyle : {}),
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={headerStyle}>
        {icon && <div style={iconContainerStyle}>{icon}</div>}
        <div style={textContainerStyle}>
          <h3
            style={{
              ...titleStyle,
              color: isHovered || isActive ? "#FFFFFF" : titleStyle.color,
            }}
          >
            {title}
          </h3>
          {subtitle && (
            <p
              style={{
                ...subtitleStyle,
                color:
                  isHovered || isActive
                    ? "rgba(255, 255, 255, 0.8)"
                    : subtitleStyle.color,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div style={valueContainerStyle}>
        <span
          style={{
            ...valueStyle,
            color: isHovered || isActive ? "#FFFFFF" : valueStyle.color,
          }}
        >
          {value}
        </span>
      </div>

      {/* Enhanced glass morphism overlay when active */}
      {isActive && <div style={activeOverlayStyle}></div>}
    </div>
  );
};

// 🔮 GLASS MORPHISM STATS CARD - Enhanced for light background
const cardStyle: React.CSSProperties = {
  position: "relative", // For overlay positioning
  background: "rgba(139, 92, 246, 0.08)", // Subtle purple tint on light background
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(139, 92, 246, 0.15)",
  borderRadius: "16px",
  padding: "1.5rem",
  boxShadow: `
    0 8px 32px rgba(139, 92, 246, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.4)
  `,
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)", // Slightly slower base transition
  outline: "none", // Prevent any default outlines
  WebkitTapHighlightColor: "transparent", // Remove mobile tap highlight
};

// 🌟 REVVUE BRAND GRADIENT HOVER EFFECT
const hoverCardStyle: React.CSSProperties = {
  background:
    "linear-gradient(105deg, rgb(76, 62, 247) 24.8649%, rgb(173, 0, 255) 132.583%)",
  borderRadius: "14px",
  boxShadow: "rgba(76, 62, 247, 0.3) 0px 10px 15px -7px",
  opacity: 1,
  willChange: "auto",
  transform: "translateY(-3px) scale(1.01)", // Lift and slight scale
  transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)", // SLOWER transition
  outline: "none", // Remove any default outline on hover
  border: "none", // No border on beautiful gradient
};

// Update text colors for gradient background
const hoverTextOverride: React.CSSProperties = {
  color: "#FFFFFF !important",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  marginBottom: "1rem",
};

const iconContainerStyle: React.CSSProperties = {
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  background: "rgba(139, 92, 246, 0.15)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const textContainerStyle: React.CSSProperties = {
  textAlign: "left", // Left aligned text
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "1rem", // Bigger text
  fontWeight: "500",
  color: "#8B5CF6", // Purple text for light background
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  textAlign: "left", // Left aligned
};

const subtitleStyle: React.CSSProperties = {
  margin: "0.25rem 0 0 0",
  fontSize: "0.875rem", // Bigger text
  color: "#6B7280", // Gray text for light background
  textAlign: "left", // Left aligned
};

const valueContainerStyle: React.CSSProperties = {
  textAlign: "left", // Left aligned
  marginTop: "0.5rem",
};

const valueStyle: React.CSSProperties = {
  fontSize: "2.25rem", // Bigger text
  fontWeight: "700",
  color: "#1F2937", // Dark text for light background
  textShadow: "none", // Remove text shadow on light background
};

// 🔥 REVVUE BRAND GRADIENT CLICK EFFECT
const activeCardStyle: React.CSSProperties = {
  background:
    "linear-gradient(105deg, rgb(76, 62, 247) 24.8649%, rgb(219, 0, 255) 132.583%)", // Even more vibrant for click
  borderRadius: "14px",
  boxShadow: "rgba(76, 62, 247, 0.5) 0px 20px 35px -7px",
  transform: "scale(1.05)", // Bigger scale up
  outline: "none", // Remove any default outline
  border: "none", // No border on beautiful gradient
  willChange: "auto",
};

const activeOverlayStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `
    linear-gradient(135deg, 
      rgba(139, 92, 246, 0.15) 0%, 
      rgba(167, 139, 250, 0.1) 50%,
      rgba(196, 181, 253, 0.05) 100%
    )
  `,
  backdropFilter: "blur(45px)", // Even more blur for active state
  WebkitBackdropFilter: "blur(45px)",
  borderRadius: "16px",
  pointerEvents: "none",
  animation: "pulseGlow 4s ease-in-out", // Gentle pulse animation
};
