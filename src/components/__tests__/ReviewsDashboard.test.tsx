/**
 * Integration tests for ReviewsDashboard component
 * Tests complete user workflows and component interactions
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { ReviewsDashboard } from "../ReviewsDashboard";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockApiResponse = {
  data: {
    dummyReviews: {
      documents: [
        {
          id: "1",
          reviewTime: "2024-01-15T10:30:00Z",
          rating: 5,
          reviewerName: "Alice Johnson",
          reviewText: "Excellent service and amazing food!",
          source: "Google",
        },
        {
          id: "2",
          reviewTime: "2024-01-14T15:45:00Z",
          rating: 4,
          reviewerName: "Bob Smith",
          reviewText: "Good experience overall, would recommend.",
          source: "Facebook",
        },
      ],
      count: 50,
    },
  },
};

describe("ReviewsDashboard Integration", () => {
  beforeEach(() => {
    mockFetch.mockClear();
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockApiResponse),
    });
  });

  it("should load and display initial reviews", async () => {
    render(<ReviewsDashboard />);

    // Should show loading initially
    expect(screen.getByText("Loading reviews...")).toBeInTheDocument();

    // Wait for reviews to load
    await waitFor(() => {
      expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
      expect(screen.getByText("Bob Smith")).toBeInTheDocument();
    });

    // Should show correct stats
    expect(screen.getByText("50")).toBeInTheDocument(); // Total count
  });

  it("should render dashboard title", async () => {
    render(<ReviewsDashboard />);

    expect(screen.getByText("Revvue Reviews Dashboard")).toBeInTheDocument();
    expect(
      screen.getByText("Discover what customers are saying")
    ).toBeInTheDocument();
  });

  it("should render filter controls", async () => {
    render(<ReviewsDashboard />);

    await waitFor(() => {
      expect(screen.getByText("Filters")).toBeInTheDocument();
    });
  });

  it("should handle API errors gracefully", async () => {
    // Mock API error
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    render(<ReviewsDashboard />);

    // Just verify the component renders without crashing
    expect(screen.getByText("Revvue Reviews Dashboard")).toBeInTheDocument();
  });

  it("should handle empty API response", async () => {
    // Mock empty response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          data: {
            dummyReviews: {
              documents: [],
              count: 0,
            },
          },
        }),
    });

    render(<ReviewsDashboard />);

    // Just verify the component renders without crashing
    expect(screen.getByText("Revvue Reviews Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Filters")).toBeInTheDocument();
  });

  it("should render all main components", async () => {
    render(<ReviewsDashboard />);

    // Should render search bar
    expect(screen.getByRole("textbox")).toBeInTheDocument();

    // Should render filter controls
    expect(screen.getByText("Filters")).toBeInTheDocument();

    // Wait for reviews to load
    await waitFor(() => {
      expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    });

    // Should render load more button
    expect(screen.getByText("Load More Reviews")).toBeInTheDocument();
  });
});
