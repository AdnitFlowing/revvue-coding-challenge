/**
 * Comprehensive tests for SearchBar component
 * Tests search functionality, debouncing, and user interactions
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchBar } from "../SearchBar";

describe("SearchBar", () => {
  it("should render search input with placeholder", () => {
    const mockOnSearch = vi.fn();
    const mockOnClear = vi.fn();

    render(
      <SearchBar
        onSearch={mockOnSearch}
        onClear={mockOnClear}
        placeholder="Search reviews..."
      />
    );

    const input = screen.getByPlaceholderText("Search reviews...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveFocus(); // Should be auto-focused
  });

  it("should handle text input", async () => {
    const mockOnSearch = vi.fn();
    const mockOnClear = vi.fn();

    render(<SearchBar onSearch={mockOnSearch} onClear={mockOnClear} />);

    const input = screen.getByRole("textbox");

    // Clear any initial calls
    mockOnSearch.mockClear();

    // Type in the input
    fireEvent.change(input, { target: { value: "excellent food" } });

    // Input value should update immediately
    expect(input).toHaveValue("excellent food");

    // Wait for debounced search
    await waitFor(
      () => {
        expect(mockOnSearch).toHaveBeenCalledWith("excellent food");
      },
      { timeout: 600 }
    );
  });

  it("should show clear button when text is entered", async () => {
    const mockOnSearch = vi.fn();
    const mockOnClear = vi.fn();

    render(<SearchBar onSearch={mockOnSearch} onClear={mockOnClear} />);

    const input = screen.getByRole("textbox");

    // Type text
    fireEvent.change(input, { target: { value: "test" } });

    // Clear button should appear
    await waitFor(() => {
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  it("should clear search when clear button is clicked", async () => {
    const mockOnSearch = vi.fn();
    const mockOnClear = vi.fn();

    render(<SearchBar onSearch={mockOnSearch} onClear={mockOnClear} />);

    const input = screen.getByRole("textbox");

    // Type text to show clear button
    fireEvent.change(input, { target: { value: "test search" } });

    await waitFor(() => {
      const buttons = screen.getAllByRole("button");
      const clearButton = buttons[0]; // First button should be clear button
      fireEvent.click(clearButton);
    });

    expect(mockOnClear).toHaveBeenCalled();
    expect(input).toHaveValue("");
  });

  it("should handle empty search", () => {
    const mockOnSearch = vi.fn();
    const mockOnClear = vi.fn();

    render(<SearchBar onSearch={mockOnSearch} onClear={mockOnClear} />);

    const input = screen.getByRole("textbox");

    // Type then clear
    fireEvent.change(input, { target: { value: "" } });

    // Empty search should be called immediately
    expect(mockOnSearch).toHaveBeenCalledWith("");
  });

  it("should disable input when loading", () => {
    const mockOnSearch = vi.fn();
    const mockOnClear = vi.fn();

    render(
      <SearchBar
        onSearch={mockOnSearch}
        onClear={mockOnClear}
        isLoading={true}
      />
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("should handle custom placeholder text", () => {
    const mockOnSearch = vi.fn();
    const mockOnClear = vi.fn();
    const customPlaceholder = "Custom search placeholder";

    render(
      <SearchBar
        onSearch={mockOnSearch}
        onClear={mockOnClear}
        placeholder={customPlaceholder}
      />
    );

    expect(screen.getByPlaceholderText(customPlaceholder)).toBeInTheDocument();
  });

  it("should maintain input focus", () => {
    const mockOnSearch = vi.fn();
    const mockOnClear = vi.fn();

    render(<SearchBar onSearch={mockOnSearch} onClear={mockOnClear} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveFocus();

    // Type text and verify focus is maintained
    fireEvent.change(input, { target: { value: "test" } });
    expect(input).toHaveFocus();
  });
});
