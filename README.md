# Revvue AI - coding challenge

## Overview

Develop a simple reviews dashboard application using React and TypeScript that fetches review data from our GraphQL API and displays it to the user. The application should have the following features:

1. **Display Reviews**: If Search field is empty, fetch and display a list of reviews from the API. As a start you can limit the number of reviews to 10.
2. **Review Information**: Show review content, ratings, and other relevant review data.
3. **Fetch More Reviews**: Give user ability to see more reviews if they want to.
4. **Reviews Search**: Allow users to search for reviews and display filtered results in the same list.

---

## Non-Functional Requirements

1. **Code Quality**: Code should be clean, easy to digest, and follow best practices.
2. **Testing**: Provide unit tests for key components and functionality.
3. **Performance**: The application should be optimized for performance, especially during rendering and API calls.

---

## Implementation Guidelines

1. **Reviews API**: Use our GraphQL API (https://app.revvue.ai/graphql/) to fetch review data.
2. **Component Decomposition**: Break down the UI into reusable components.
3. **Error Handling**: Implement robust error handling for network requests and user inputs.
4. **State Management**: Efficiently manage the state of the application.

---

## Deliverables
Please note that this coding challenge is **not limited on time** and you can work on it over multiple sessions.

A single compressed file or commits to git repository containing the following:

1. A fully functional React / Typescript application.
2. Vitest unit tests covering critical paths of the application.
3. Readme file explaining approach and critical parts of the code.

---

## Setup

```bash
npm install
npm run dev
```
