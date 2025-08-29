import { describe, it, expect } from "vitest";
import { handleGraphQLError, handleGenericError } from "../errorHandling";

describe("errorHandling", () => {
  describe("handleGraphQLError", () => {
    it("should handle network error", () => {
      const error = { networkError: { message: "Network failed" } };
      const result = handleGraphQLError(error);

      expect(result.code).toBe("NETWORK_ERROR");
      expect(result.message).toContain("Unable to connect");
    });

    it("should handle GraphQL errors", () => {
      const error = {
        graphQLErrors: [
          { message: "Field not found", extensions: { code: "FIELD_ERROR" } },
        ],
      };
      const result = handleGraphQLError(error);

      expect(result.code).toBe("FIELD_ERROR");
      expect(result.message).toBe("Field not found");
    });

    it("should handle error with message", () => {
      const error = { message: "Something went wrong" };
      const result = handleGraphQLError(error);

      expect(result.code).toBe("ERROR_WITH_MESSAGE");
      expect(result.message).toBe("Something went wrong");
    });

    it("should handle unknown error", () => {
      const error = "string error";
      const result = handleGraphQLError(error);

      expect(result.code).toBe("UNKNOWN_ERROR");
      expect(result.message).toBe("An unexpected error occurred.");
    });
  });

  describe("handleGenericError", () => {
    it("should handle Error instance", () => {
      const error = new Error("Test error");
      const result = handleGenericError(error);

      expect(result.code).toBe("GENERIC_ERROR");
      expect(result.message).toBe("Test error");
    });

    it("should handle unknown error", () => {
      const error = { unknown: "object" };
      const result = handleGenericError(error);

      expect(result.code).toBe("UNKNOWN_ERROR");
      expect(result.message).toBe("An unexpected error occurred.");
    });
  });
});
