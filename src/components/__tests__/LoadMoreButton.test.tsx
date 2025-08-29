/**
 * Tests for LoadMoreButton component
 * Tests button states and user interactions
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LoadMoreButton } from "../LoadMoreButton";

describe("LoadMoreButton", () => {
  it("should render load more button", () => {
    const mockOnLoadMore = vi.fn();

    render(<LoadMoreButton onLoadMore={mockOnLoadMore} hasMore={true} />);

    expect(screen.getByText("Load More Reviews")).toBeInTheDocument();
  });

  it("should call onLoadMore when clicked", () => {
    const mockOnLoadMore = vi.fn();

    render(<LoadMoreButton onLoadMore={mockOnLoadMore} hasMore={true} />);

    const button = screen.getByText("Load More Reviews");
    fireEvent.click(button);

    expect(mockOnLoadMore).toHaveBeenCalled();
  });

  it("should show loading state", () => {
    const mockOnLoadMore = vi.fn();

    render(
      <LoadMoreButton
        onLoadMore={mockOnLoadMore}
        loading={true}
        hasMore={true}
      />
    );

    expect(screen.getByText("Loading more...")).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("should show end message when no more reviews", () => {
    const mockOnLoadMore = vi.fn();

    render(<LoadMoreButton onLoadMore={mockOnLoadMore} hasMore={false} />);

    expect(
      screen.getByText("You've seen all the reviews!")
    ).toBeInTheDocument();
    expect(screen.queryByText("Load More Reviews")).not.toBeInTheDocument();
  });

  it("should be disabled when disabled prop is true", () => {
    const mockOnLoadMore = vi.fn();

    render(
      <LoadMoreButton
        onLoadMore={mockOnLoadMore}
        disabled={true}
        hasMore={true}
      />
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("should handle both loading and disabled states", () => {
    const mockOnLoadMore = vi.fn();

    render(
      <LoadMoreButton
        onLoadMore={mockOnLoadMore}
        loading={true}
        disabled={true}
        hasMore={true}
      />
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(screen.getByText("Loading more...")).toBeInTheDocument();
  });
});
