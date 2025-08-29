# Revvue Reviews Dashboard

A React TypeScript application for displaying customer reviews with search and filtering capabilities.

## Features

- Display reviews from GraphQL API with initial limit of 5
- Search reviews by content, reviewer name, or source
- Filter reviews by rating and source platform
- Load more reviews with pagination
- Real-time statistics and analytics
- Responsive design with modern UI

## Setup

```bash
npm install
npm run dev
```

## Testing

```bash
npm run test
npm run test:coverage
```

## Build

```bash
npm run build
```

## Architecture

### Components

- `ReviewsDashboard` - Main container component managing state and API calls
- `ReviewCard` - Individual review display with rating and metadata
- `SearchBar` - Search input with debounced API calls
- `FilterControls` - Rating and source filtering interface
- `StatsCard` - KPI display cards with interactive effects
- `LoadMoreButton` - Pagination control for loading additional reviews

### API Integration

Uses native fetch to connect to the Revvue GraphQL API at `https://app.revvue.ai/graphql/` with the `dummyReviews` query. Implements proper error handling and loading states.

### State Management

- Client-side filtering for instant search results
- Smart pagination combining API calls with display limits
- Real-time statistics calculation based on filtered data
- Debounced search to optimize API usage

### Performance

- React.memo for optimized component re-rendering
- useMemo and useCallback for expensive operations
- Client-side filtering to reduce API calls
- Efficient state updates and re-render prevention

## Technical Decisions

**Client-Side Filtering**: After initial data load, filtering happens client-side for instant results and better user experience.

## Testing Strategy

Comprehensive test suite covering:

- Component rendering and user interactions
- API integration and error handling
- Search and filtering functionality
- Edge cases and error scenarios
