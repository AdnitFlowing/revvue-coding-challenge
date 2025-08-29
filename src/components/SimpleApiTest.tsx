/**
 * Simple API test using fetch instead of Apollo Client
 * This will help us verify the API works before fixing Apollo issues
 */

import { useState, useEffect } from "react";

interface ReviewData {
  id: string;
  reviewTime: string;
  rating: number;
  reviewerName?: string;
  reviewText: string;
  source: string;
}

interface ApiResponse {
  dummyReviews: {
    documents: ReviewData[];
    count: number;
  };
}

interface ApiTestState {
  loading: boolean;
  data: ApiResponse | null;
  error: string | null;
}

export const SimpleApiTest = () => {
  const [state, setState] = useState<ApiTestState>({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    const testApi = async () => {
      try {
        const response = await fetch("https://app.revvue.ai/graphql/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query TestDummyReviews {
                dummyReviews(limit: 2) {
                  documents {
                    id
                    reviewTime
                    rating
                    reviewerName
                    reviewText
                    source
                  }
                  count
                }
              }
            `,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.errors) {
          throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
        }

        setState({
          loading: false,
          data: result.data,
          error: null,
        });
      } catch (err) {
        setState({
          loading: false,
          data: null,
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }
    };

    testApi();
  }, []);

  if (state.loading) {
    return (
      <div
        style={{ padding: "1rem", border: "2px solid blue", margin: "1rem" }}
      >
        <h3>🔄 Testing API Connection...</h3>
        <p>Using direct fetch to test GraphQL endpoint</p>
      </div>
    );
  }

  if (state.error) {
    return (
      <div style={{ padding: "1rem", border: "2px solid red", margin: "1rem" }}>
        <h3>❌ API Connection Failed</h3>
        <p style={{ color: "red", fontWeight: "bold" }}>{state.error}</p>
        <details style={{ marginTop: "1rem" }}>
          <summary>Debug Info</summary>
          <ul style={{ fontSize: "14px", marginTop: "0.5rem" }}>
            <li>Endpoint: https://app.revvue.ai/graphql/</li>
            <li>Method: POST</li>
            <li>Query: dummyReviews</li>
          </ul>
        </details>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem", border: "2px solid green", margin: "1rem" }}>
      <h3>✅ API Connection Successful!</h3>
      <p>Found {state.data?.dummyReviews?.count} total reviews</p>
      <p>Retrieved {state.data?.dummyReviews?.documents?.length} reviews</p>

      <h4>Sample Reviews:</h4>
      {state.data?.dummyReviews?.documents?.map((review: ReviewData) => (
        <div
          key={review.id}
          style={{
            marginTop: "0.5rem",
            padding: "0.5rem",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
          }}
        >
          <strong>{review.reviewerName || "Anonymous"}</strong> - Rating:{" "}
          {review.rating}/5
          <br />
          <small style={{ color: "#666" }}>Source: {review.source}</small>
          <br />
          <em>"{review.reviewText}"</em>
        </div>
      ))}
    </div>
  );
};
