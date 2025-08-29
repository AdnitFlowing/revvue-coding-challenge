/**
 * Utility functions for data formatting
 */

/**
 * Format a date string to a human-readable format
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  } catch {
    return "Invalid date";
  }
};

/**
 * Format a rating to display stars
 */
export const formatRating = (rating: number): string => {
  const stars =
    "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  return `${stars} (${rating.toFixed(1)})`;
};

/**
 * Truncate text to a specified length with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

/**
 * Debounce function for search input
 */
export const debounce = <TArgs extends unknown[]>(
  func: (...args: TArgs) => void,
  delay: number
): ((...args: TArgs) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: TArgs) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
