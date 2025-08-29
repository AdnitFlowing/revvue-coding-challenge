/**
 * TypeScript interfaces for review data
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
  source?: string;
  ratingMin?: number;
  ratingMax?: number;
  freeText?: string;
  offset?: number;
  limit?: number;
}

export interface SearchReviewsVariables {
  searchTerm: string;
  limit?: number;
  offset?: number;
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
