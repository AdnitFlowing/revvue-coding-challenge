/**
 *  ReviewCard component
 * Tests rendering, interactions, and glass morphism effects
 */

import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ReviewCard } from "../ReviewCard";

const mockReview = {
  id: "test-1",
  reviewTime: "2024-01-15T10:30:00Z",
  rating: 4,
  reviewerName: "John Doe",
  reviewText: "Excellent service and great food! Would definitely recommend.",
  source: "Google",
};

describe("ReviewCard", () => {
  it("should render review information correctly", () => {
    render(<ReviewCard {...mockReview} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("4.0")).toBeInTheDocument();
    expect(
      screen.getByText(
        /"Excellent service and great food! Would definitely recommend."/
      )
    ).toBeInTheDocument();
    expect(screen.getByText("GOOGLE")).toBeInTheDocument();
  });

  it("should render anonymous reviewer when name is missing", () => {
    const anonymousReview = { ...mockReview, reviewerName: undefined };
    render(<ReviewCard {...anonymousReview} />);

    expect(screen.getByText("Anonymous Customer")).toBeInTheDocument();
  });

  it("should display rating correctly", () => {
    render(<ReviewCard {...mockReview} />);

    expect(screen.getByText("4.0")).toBeInTheDocument();
  });

  it("should format date correctly", () => {
    render(<ReviewCard {...mockReview} />);

    // Should display formatted date
    expect(screen.getByText(/Jan 15, 2024/i)).toBeInTheDocument();
  });

  it("should handle different rating values correctly", () => {
    const lowRatingReview = { ...mockReview, rating: 1 };
    const { rerender } = render(<ReviewCard {...lowRatingReview} />);

    expect(screen.getByText("1.0")).toBeInTheDocument();

    rerender(<ReviewCard {...{ ...mockReview, rating: 5 }} />);
    expect(screen.getByText("5.0")).toBeInTheDocument();
  });

  it("should handle long review text properly", () => {
    const longTextReview = {
      ...mockReview,
      reviewText:
        "This is a very long review text that should be displayed properly without breaking the layout. It contains multiple sentences and should maintain good readability and formatting throughout the entire text block.",
    };

    render(<ReviewCard {...longTextReview} />);

    expect(
      screen.getByText(/This is a very long review text/)
    ).toBeInTheDocument();
  });

  it("should render source information", () => {
    render(<ReviewCard {...mockReview} />);

    expect(screen.getByText("Google")).toBeInTheDocument();
    expect(screen.getByText("GOOGLE")).toBeInTheDocument(); // Source badge
  });

  it("should handle different sources", () => {
    const facebookReview = { ...mockReview, source: "Facebook" };
    render(<ReviewCard {...facebookReview} />);

    expect(screen.getByText("Facebook")).toBeInTheDocument();
    expect(screen.getByText("FACEBOOK")).toBeInTheDocument();
  });

  it("should render all required elements", () => {
    render(<ReviewCard {...mockReview} />);

    // All essential elements should be present
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("4.0")).toBeInTheDocument();
    expect(screen.getByText("Google")).toBeInTheDocument();
    expect(screen.getByText(/Jan 15, 2024/i)).toBeInTheDocument();
  });
});
