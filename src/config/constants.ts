/**
 * Application configuration
 */

export const API_CONFIG = {
  GRAPHQL_ENDPOINT: "https://app.revvue.ai/graphql/",
} as const;

export const APP_CONFIG = {
  TITLE: "Revvue Reviews Dashboard",
  DEFAULT_REVIEWS_LIMIT: 5, // Show 5 initially as required
  LOAD_MORE_LIMIT: 10, // Load 10 more each time
  SEARCH_DEBOUNCE_MS: 300,
} as const;

export const UI_CONFIG = {
  MAX_RATING: 5,
  MIN_RATING: 1,
  SKELETON_ITEMS: 3,
} as const;
