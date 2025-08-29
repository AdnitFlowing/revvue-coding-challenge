/**
 * Error handling utilities
 */

export interface AppError {
  message: string;
  code?: string;
  details?: unknown;
}

/**
 * Convert Apollo GraphQL errors to user-friendly messages
 * Note: Will be implemented once we set up Apollo Client in Commit 2
 */
export const handleGraphQLError = (error: unknown): AppError => {
  // Type guard for objects with properties
  const isErrorWithProperty = (err: unknown, prop: string): boolean => {
    return typeof err === "object" && err !== null && prop in err;
  };

  // Network errors
  if (isErrorWithProperty(error, "networkError")) {
    return {
      message:
        "Unable to connect to the server. Please check your internet connection.",
      code: "NETWORK_ERROR",
      details: error,
    };
  }

  // GraphQL errors
  if (isErrorWithProperty(error, "graphQLErrors")) {
    const errorObj = error as {
      graphQLErrors: Array<{
        message?: string;
        extensions?: { code?: string };
      }>;
    };
    if (errorObj.graphQLErrors?.length > 0) {
      const firstError = errorObj.graphQLErrors[0];
      return {
        message:
          firstError.message || "An error occurred while fetching reviews.",
        code: firstError.extensions?.code || "GRAPHQL_ERROR",
        details: firstError,
      };
    }
  }

  // Error with message
  if (isErrorWithProperty(error, "message")) {
    const errorObj = error as { message: string };
    return {
      message: errorObj.message,
      code: "ERROR_WITH_MESSAGE",
      details: error,
    };
  }

  // Generic error
  return {
    message: "An unexpected error occurred.",
    code: "UNKNOWN_ERROR",
    details: error,
  };
};

/**
 * Generic error handler for non-GraphQL errors
 */
export const handleGenericError = (error: unknown): AppError => {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: "GENERIC_ERROR",
      details: error,
    };
  }

  return {
    message: "An unexpected error occurred.",
    code: "UNKNOWN_ERROR",
    details: error,
  };
};
