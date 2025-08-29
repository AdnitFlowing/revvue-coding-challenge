/**
 * GraphQL queries for the Revvue Reviews Dashboard
 * Based on the actual API schema discovered from https://app.revvue.ai/graphql/
 */

import { gql } from "@apollo/client";

/**
 * Query to fetch dummy reviews with pagination and filtering
 * Matches the exact API structure: dummyReviews returns DummyReviewQuery
 */
export const GET_DUMMY_REVIEWS = gql`
  query GetDummyReviews(
    $source: String
    $ratingMin: Int
    $ratingMax: Int
    $freeText: String
    $offset: Int = 0
    $limit: Int = 10
  ) {
    dummyReviews(
      source: $source
      ratingMin: $ratingMin
      ratingMax: $ratingMax
      freeText: $freeText
      offset: $offset
      limit: $limit
    ) {
      documents {
        id
        reviewTime
        rating
        reviewerName
        reviewText
        source
        sourceUrl
        language
        translated
      }
      count
    }
  }
`;

/**
 * Query to get a limited set of reviews for initial load
 * Uses the APP_CONFIG default limit
 */
export const GET_INITIAL_REVIEWS = gql`
  query GetInitialReviews($limit: Int = 5) {
    dummyReviews(limit: $limit, offset: 0) {
      documents {
        id
        reviewTime
        rating
        reviewerName
        reviewText
        source
        sourceUrl
        language
        translated
      }
      count
    }
  }
`;

/**
 * Query to search reviews by text content
 * Uses the freeText parameter for search functionality
 */
export const SEARCH_REVIEWS = gql`
  query SearchReviews(
    $searchTerm: String!
    $limit: Int = 10
    $offset: Int = 0
  ) {
    dummyReviews(freeText: $searchTerm, limit: $limit, offset: $offset) {
      documents {
        id
        reviewTime
        rating
        reviewerName
        reviewText
        source
        sourceUrl
        language
        translated
      }
      count
    }
  }
`;
