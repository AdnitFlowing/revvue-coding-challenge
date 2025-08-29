/**
 * Glass Morphism Stats Card Component
 * Beautiful metric display with pastel purple accents
 */

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
}

export const StatsCard = ({ title, value, subtitle, icon }: StatsCardProps) => {
  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        {icon && <div style={iconContainerStyle}>{icon}</div>}
        <div>
          <h3 style={titleStyle}>{title}</h3>
          {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
        </div>
      </div>

      <div style={valueContainerStyle}>
        <span style={valueStyle}>{value}</span>
      </div>
    </div>
  );
};

// 🔮 GLASS MORPHISM STATS CARD
const cardStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "16px",
  padding: "1.5rem",
  boxShadow: `
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2)
  `,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

  ":hover": {
    transform: "translateY(-2px)",
    boxShadow: `
      0 12px 40px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.3)
    `,
  } as any,
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
  background: "rgba(255, 255, 255, 0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "0.875rem",
  fontWeight: "500",
  color: "rgba(255, 255, 255, 0.9)",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const subtitleStyle: React.CSSProperties = {
  margin: "0.25rem 0 0 0",
  fontSize: "0.75rem",
  color: "rgba(255, 255, 255, 0.7)",
};

const valueContainerStyle: React.CSSProperties = {
  textAlign: "center",
};

const valueStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: "700",
  color: "rgba(255, 255, 255, 0.95)",
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};
