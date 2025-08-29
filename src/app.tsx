import "./app.css";
import { SimpleApiTest } from "./components/SimpleApiTest";

function App() {
  return (
    <section>
      <h1>Revvue Reviews Dashboard</h1>
      <p>Testing API connection before setting up Apollo Client...</p>
      <SimpleApiTest />
    </section>
  );
}

// Original App component (temporarily disabled for API testing)
// Will restore once API connection is verified

export default App;
