/**
 * Core Review types for the Revvue AI Dashboard
 * These interfaces define the shape of review data from the GraphQL API
 */

export interface Review {
  id: string;
  reviewTime: string;
  rating: number;
  reviewerName?: string;
  reviewText: string;
  source: string;
  sourceUrl?: string;
  language?: string;
  translated?: string;
}

export interface ReviewsResponse {
  dummyReviews: Review[];
}

export interface DummyReviewsQueryResponse {
  dummyReviews: {
    documents: Review[];
    count: number;
  };
}

export interface ReviewsQueryVariables {
  limit?: number;
  offset?: number;
  searchTerm?: string;
}

export interface ReviewsState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  searchTerm: string;
}

export interface SearchFilters {
  minRating?: number;
  maxRating?: number;
  isVerified?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}
