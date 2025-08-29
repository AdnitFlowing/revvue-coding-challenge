import "./app.css";
import { ReviewsDashboard } from "./components/ReviewsDashboard";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <ReviewsDashboard />
    </ErrorBoundary>
  );
}

export default App;
