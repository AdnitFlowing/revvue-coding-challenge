import { describe, it, expect, vi } from "vitest";
import {
  formatDate,
  formatRating,
  truncateText,
  debounce,
} from "../formatters";

describe("formatters", () => {
  describe("formatDate", () => {
    it("should format valid date string", () => {
      const result = formatDate("2024-01-15T10:30:00Z");
      expect(result).toMatch(/Jan 15, 2024/);
    });

    it("should handle invalid date", () => {
      const result = formatDate("invalid-date");
      expect(result).toBe("Invalid date");
    });
  });

  describe("formatRating", () => {
    it("should format rating with stars", () => {
      const result = formatRating(4.5);
      expect(result).toBe("★★★★☆ (4.5)");
    });

    it("should handle perfect rating", () => {
      const result = formatRating(5);
      expect(result).toBe("★★★★★ (5.0)");
    });
  });

  describe("truncateText", () => {
    it("should truncate long text", () => {
      const longText = "This is a very long text that should be truncated";
      const result = truncateText(longText, 20);
      expect(result).toBe("This is a very long...");
    });

    it("should not truncate short text", () => {
      const shortText = "Short text";
      const result = truncateText(shortText, 20);
      expect(result).toBe("Short text");
    });
  });

  describe("debounce", () => {
    it("should debounce function calls", async () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn("test1");
      debouncedFn("test2");
      debouncedFn("test3");

      expect(mockFn).not.toHaveBeenCalled();

      await new Promise((resolve) => setTimeout(resolve, 150));

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith("test3");
    });
  });
});
