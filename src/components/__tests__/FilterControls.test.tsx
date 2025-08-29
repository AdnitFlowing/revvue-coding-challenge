/**
 * Comprehensive tests for FilterControls component
 * Tests user interactions, state management, and filter logic
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FilterControls } from "../FilterControls";

const mockAvailableSources = ["Google", "Facebook", "TripAdvisor"];

describe("FilterControls", () => {
  it("should render filter toggle button", () => {
    const mockOnFilterChange = vi.fn();

    render(
      <FilterControls
        onFilterChange={mockOnFilterChange}
        availableSources={mockAvailableSources}
      />
    );

    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /filters/i })
    ).toBeInTheDocument();
  });

  it("should show filter panel when toggle is clicked", async () => {
    const mockOnFilterChange = vi.fn();

    render(
      <FilterControls
        onFilterChange={mockOnFilterChange}
        availableSources={mockAvailableSources}
      />
    );

    const toggleButton = screen.getByRole("button", { name: /filters/i });
    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(screen.getByText("Rating")).toBeInTheDocument();
      expect(screen.getByText("Sources")).toBeInTheDocument();
    });
  });

  it("should handle rating filter selection", async () => {
    const mockOnFilterChange = vi.fn();

    render(
      <FilterControls
        onFilterChange={mockOnFilterChange}
        availableSources={mockAvailableSources}
      />
    );

    // Open filter panel
    const toggleButton = screen.getByRole("button", { name: /filters/i });
    fireEvent.click(toggleButton);

    // Click 4+ Stars filter
    await waitFor(() => {
      const ratingButton = screen.getByText("4+ Stars");
      fireEvent.click(ratingButton);
    });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      minRating: 4,
      maxRating: 5,
      sources: [],
    });
  });

  it("should handle source filter selection", async () => {
    const mockOnFilterChange = vi.fn();

    render(
      <FilterControls
        onFilterChange={mockOnFilterChange}
        availableSources={mockAvailableSources}
      />
    );

    // Open filter panel
    const toggleButton = screen.getByRole("button", { name: /filters/i });
    fireEvent.click(toggleButton);

    // Click Google source filter
    await waitFor(() => {
      const sourceButton = screen.getByText("Google");
      fireEvent.click(sourceButton);
    });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      minRating: null,
      maxRating: null,
      sources: ["Google"],
    });
  });

  it("should show clear filters button when filters are active", async () => {
    const mockOnFilterChange = vi.fn();

    render(
      <FilterControls
        onFilterChange={mockOnFilterChange}
        availableSources={mockAvailableSources}
      />
    );

    // Open filter panel and select a filter
    const toggleButton = screen.getByRole("button", { name: /filters/i });
    fireEvent.click(toggleButton);

    await waitFor(() => {
      const ratingButton = screen.getByText("5+ Stars");
      fireEvent.click(ratingButton);
    });

    // Clear button should appear
    await waitFor(() => {
      expect(screen.getByText("Clear")).toBeInTheDocument();
    });

    // Click clear button
    const clearButton = screen.getByText("Clear");
    fireEvent.click(clearButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      minRating: null,
      maxRating: null,
      sources: [],
    });
  });

  it("should show filter badge with correct count", async () => {
    const mockOnFilterChange = vi.fn();

    render(
      <FilterControls
        onFilterChange={mockOnFilterChange}
        availableSources={mockAvailableSources}
      />
    );

    // Open filter panel
    const toggleButton = screen.getByRole("button", { name: /filters/i });
    fireEvent.click(toggleButton);

    // Select rating filter
    await waitFor(() => {
      const ratingButton = screen.getByText("3+ Stars");
      fireEvent.click(ratingButton);
    });

    // Select source filter
    await waitFor(() => {
      const sourceButton = screen.getByText("Facebook");
      fireEvent.click(sourceButton);
    });

    // Should show badge with count of 2 (1 rating + 1 source)
    await waitFor(() => {
      expect(screen.getByText("2")).toBeInTheDocument();
    });
  });

  it("should disable filters when loading", () => {
    const mockOnFilterChange = vi.fn();

    render(
      <FilterControls
        onFilterChange={mockOnFilterChange}
        availableSources={mockAvailableSources}
        isLoading={true}
      />
    );

    const toggleButton = screen.getByRole("button", { name: /filters/i });
    expect(toggleButton).toBeDisabled();
  });
});
