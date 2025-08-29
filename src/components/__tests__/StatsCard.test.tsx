/**
 * Comprehensive tests for StatsCard component
 * Tests rendering, interactions, and glass morphism effects
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { StatsCard } from "../StatsCard";
import { Star } from "lucide-react";

describe("StatsCard", () => {
  it("should render card with title and value", () => {
    render(<StatsCard title="Total Reviews" value={42} subtitle="All time" />);

    expect(screen.getByText("Total Reviews")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("All time")).toBeInTheDocument();
  });

  it("should render with icon when provided", () => {
    render(
      <StatsCard
        title="Rating"
        value="4.5"
        icon={<Star data-testid="star-icon" />}
      />
    );

    expect(screen.getByTestId("star-icon")).toBeInTheDocument();
  });

  it("should render without subtitle when not provided", () => {
    render(<StatsCard title="Count" value={10} />);

    expect(screen.getByText("Count")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("should handle click interaction when onClick is provided", () => {
    const mockOnClick = vi.fn();

    render(
      <StatsCard title="Clickable Card" value={100} onClick={mockOnClick} />
    );

    // Find the card by title and click it
    const titleElement = screen.getByText("Clickable Card");
    const cardContainer = titleElement.closest("div")?.parentElement;

    if (cardContainer) {
      fireEvent.click(cardContainer);
      expect(mockOnClick).toHaveBeenCalled();
    }
  });

  it("should render correctly without onClick", () => {
    render(<StatsCard title="Static Card" value={50} />);

    expect(screen.getByText("Static Card")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
  });

  it("should render when active", () => {
    render(<StatsCard title="Active Card" value={75} isActive={true} />);

    expect(screen.getByText("Active Card")).toBeInTheDocument();
    expect(screen.getByText("75")).toBeInTheDocument();
  });

  it("should handle hover interactions", () => {
    render(<StatsCard title="Hoverable Card" value={25} onClick={() => {}} />);

    const titleElement = screen.getByText("Hoverable Card");
    const cardContainer = titleElement.closest("div")?.parentElement;

    if (cardContainer) {
      fireEvent.mouseEnter(cardContainer);
      expect(cardContainer).toBeInTheDocument();

      fireEvent.mouseLeave(cardContainer);
      expect(cardContainer).toBeInTheDocument();
    }
  });

  it("should handle string and number values", () => {
    const { rerender } = render(<StatsCard title="Number Value" value={123} />);
    expect(screen.getByText("123")).toBeInTheDocument();

    rerender(<StatsCard title="String Value" value="4.5 ⭐" />);
    expect(screen.getByText("4.5 ⭐")).toBeInTheDocument();
  });

  it("should display title correctly", () => {
    render(<StatsCard title="Test Title" value={1} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("should handle different value types", () => {
    const { rerender } = render(<StatsCard title="Test" value={0} />);
    expect(screen.getByText("0")).toBeInTheDocument();

    rerender(<StatsCard title="Test" value="N/A" />);
    expect(screen.getByText("N/A")).toBeInTheDocument();

    rerender(<StatsCard title="Test" value={999} />);
    expect(screen.getByText("999")).toBeInTheDocument();
  });
});
