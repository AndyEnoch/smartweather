# WeatherScope

A React Native weather application built with Expo that displays current conditions and forecasts using the Open-Meteo API. The app features four distinct screens, automatic data refresh every three minutes, and support for multiple preset locations.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
3. [Available Scripts](#available-scripts)
4. [App Overview](#app-overview)
5. [Tech Stack](#tech-stack)
6. [Project Structure](#project-structure)
7. [Architecture and Approach](#architecture-and-approach)
8. [Data Flow](#data-flow)
9. [Key Technical Decisions](#key-technical-decisions)
10. [Component Design](#component-design)
11. [Auto-Refresh Mechanism](#auto-refresh-mechanism)
12. [Location Switching](#location-switching)

---

## Prerequisites

- **Node.js** v18 or higher
- **npm** (bundled with Node.js)
- **Expo Go** app installed on your physical device (available on the App Store and Google Play Store), or an iOS Simulator / Android Emulator configured on your machine

## Getting Started

```bash
# 1. Clone the repository and navigate into it
cd smartApp-weather

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Start the Expo development server
npm start
```

Once the server is running, you will see a QR code in the terminal.

- **Physical device:** Open the Expo Go app and scan the QR code.
- **iOS Simulator:** Press `i` in the terminal.
- **Android Emulator:** Press `a` in the terminal.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the Expo development server |
| `npm run ios` | Start and open on iOS Simulator |
| `npm run android` | Start and open on Android Emulator |

---

## App Overview

The application is organized into four tabs:

**Now** -- Answers "What is the weather now?" with a large temperature display, weather condition label, feels-like temperature, and a six-stat grid (wind speed, wind direction, humidity, pressure, visibility, UV index). A "What is coming next?" section shows a horizontally scrollable strip of the next 13 hours.

**Hourly** -- A 24-hour forecast with an area chart that can be switched between temperature, wind speed, and humidity. Below the chart is a scrollable row of hourly cards with weather icons and key metrics.

**Wind and Air** -- An animated SVG compass with a spring-driven needle showing wind direction, speed, and gusts. Below that is an atmosphere section with a humidity arc gauge, a pressure linear gauge with a standard atmosphere marker, and a color-coded UV index scale. A Beaufort scale indicator shows the current wind classification.

**Forecast** -- A compact five-day snapshot with temperature range bars spanning a global min-max scale, followed by a detailed seven-day forecast with individual day cards.

All screens share a common header with the app name, a tappable location selector, a circular countdown timer showing time until the next auto-refresh, and a manual refresh button.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Expo (managed workflow) | SDK 55 |
| Language | TypeScript (strict mode) | 5.9 |
| Routing | expo-router (file-based) | 55.x |
| Data Fetching | @tanstack/react-query | 5.x |
| Animations | react-native-reanimated | 4.x |
| Visualizations | react-native-svg | 15.x |
| Icons | @expo/vector-icons (Ionicons, MaterialCommunityIcons) | 15.x |
| Date Utilities | date-fns | 4.x |
| Gradient Backgrounds | expo-linear-gradient | 55.x |

---

## Project Structure

```
smartApp-weather/
|-- app/                          # Expo Router file-based routing
|   |-- _layout.tsx               # Root layout: QueryClient + LocationProvider
|   +-- (tabs)/                   # Tab group
|       |-- _layout.tsx           # Tab navigator configuration
|       |-- index.tsx             # Now screen
|       |-- hourly.tsx            # Hourly screen
|       |-- wind-air.tsx          # Wind and Air screen
|       +-- forecast.tsx          # Forecast screen
|
|-- src/                          # Application source code
|   |-- api/                      # API layer
|   |   |-- weather.ts            # Open-Meteo fetch + response transform
|   |   +-- types.ts              # Raw API response TypeScript types
|   |
|   |-- context/                  # React Context providers
|   |   +-- LocationContext.tsx    # Global location state
|   |
|   |-- hooks/                    # Custom React hooks
|   |   |-- useWeatherData.ts     # React Query weather hook
|   |   +-- useRefreshTimer.ts    # Countdown timer for refresh indicator
|   |
|   |-- components/               # UI components
|   |   |-- common/               # Shared across all screens
|   |   |   |-- Card.tsx
|   |   |   |-- ErrorView.tsx
|   |   |   |-- GradientBackground.tsx
|   |   |   |-- Header.tsx
|   |   |   |-- LoadingOverlay.tsx
|   |   |   |-- LocationPicker.tsx
|   |   |   |-- RefreshTimer.tsx
|   |   |   |-- TabSelector.tsx
|   |   |   +-- WeatherIcon.tsx
|   |   |-- now/                  # Now screen components
|   |   |-- hourly/               # Hourly screen components
|   |   |-- wind/                 # Wind and Air screen components
|   |   +-- forecast/             # Forecast screen components
|   |
|   |-- constants/                # Static configuration
|   |   |-- theme.ts              # Colors, spacing, typography, border radii
|   |   +-- weather.ts            # WMO codes, Beaufort scale, preset locations
|   |
|   |-- utils/                    # Pure utility functions
|   |   |-- weather.ts            # Label lookups, scale calculations
|   |   +-- format.ts             # Number and date formatting
|   |
|   +-- types/                    # Shared TypeScript types
|       +-- weather.ts            # App-level weather data models
|
+-- docs/                         # Internal documentation (git-ignored)
    |-- ARCHITECTURE.md
    |-- DECISIONS.md
    +-- FLOW.md
```

---

## Architecture and Approach

### Separation of Concerns

The codebase is organized into distinct layers, each with a single responsibility:

- **API Layer** (`src/api/`): Handles HTTP requests to the Open-Meteo endpoint and transforms raw snake_case JSON responses into clean, camelCase TypeScript types. This layer has no knowledge of the UI.

- **Context Layer** (`src/context/`): Manages global state that needs to be shared across screens. Currently this includes the selected location. React Context was chosen over a state management library because there is only one piece of shared state, making Context the simplest correct solution.

- **Hooks Layer** (`src/hooks/`): Encapsulates data fetching and timer logic. `useWeatherData` wraps React Query with the auto-refresh configuration, while `useRefreshTimer` provides a ticking countdown for the UI.

- **Component Layer** (`src/components/`): Contains pure presentational components that receive data via props. Components are grouped by screen (now, hourly, wind, forecast) with shared components in a `common` directory.

- **Screen Layer** (`app/(tabs)/`): Orchestration files that connect hooks to components. Each screen calls `useWeatherData()`, handles loading and error states, and passes data down to presentational components.

### Type Safety

TypeScript strict mode is enabled across the project. There are two distinct type layers:

- `src/api/types.ts` mirrors the exact shape of the Open-Meteo API response (snake_case field names, raw number types).
- `src/types/weather.ts` defines the app-level domain models (camelCase, booleans instead of 0/1 integers, structured objects instead of parallel arrays).

The transform functions in `src/api/weather.ts` bridge these two type systems, ensuring that if the API response shape changes, only the transform layer needs updating -- not the entire UI.

### Component Organization

Components follow a flat, screen-based grouping strategy:

- **`common/`** holds components reused across multiple screens: Card, Header, LoadingOverlay, ErrorView, GradientBackground, WeatherIcon, TabSelector, RefreshTimer, and LocationPicker.
- **Screen-specific directories** (now, hourly, wind, forecast) hold components used only within that particular screen.
- Each component is a single file with co-located styles using `StyleSheet.create`.

This approach makes it straightforward to find any component -- either it is shared (check `common/`) or it belongs to a specific screen.

---

## Data Flow

```
Open-Meteo API
    |
    v
src/api/weather.ts -- fetchWeather() fetches and transforms
    |
    v
@tanstack/react-query cache -- key: ['weather', latitude, longitude]
    |
    +-- refetchInterval: 3 minutes (automatic background polling)
    +-- staleTime: 3 minutes (data considered fresh for this duration)
    +-- retry: 3 attempts with exponential backoff
    |
    v
useWeatherData() hook -- reads location from LocationContext
    |
    v
Screen components (Now, Hourly, Wind and Air, Forecast)
    |
    v
Presentational components -- receive data via props
```

All four screens call the same `useWeatherData()` hook, which reads from a shared React Query cache. This means:

- Navigating between tabs is instant because data is already cached.
- A background refetch on any tab updates the data for all tabs simultaneously.
- Switching to a different location creates a new cache entry (keyed by latitude and longitude), so previously fetched location data remains available if the user switches back.

---

## Key Technical Decisions

### React Query for Data Fetching

The assignment requires automatic refresh every three minutes with clean handling (no flickering, no unnecessary re-renders). React Query solves this with its `refetchInterval` option and stale-while-revalidate pattern. During a background refetch, the existing data remains visible while fresh data loads behind the scenes. The built-in `isRefetching` flag allows showing a subtle loading overlay without replacing the entire screen with a spinner.

The alternative of `useEffect` with `setInterval` would require manually managing cache state, implementing retry logic, handling race conditions on unmount, and synchronizing data across tabs.

### Expo Router for Navigation

Expo Router provides file-system-based routing similar to Next.js. The `app/(tabs)/` directory convention automatically creates a tab navigator. This eliminates manual navigation configuration and gives us deep linking support for free. Each screen file is the route -- the file structure is the routing table.

### Custom SVG Charts

Rather than pulling in a full charting library like Victory Native or react-native-skia, the 24-hour forecast chart is built with raw `react-native-svg`. This keeps the bundle lean and gives full control over the gradient fill, curve interpolation, axis labels, grid lines, and the NOW marker. The trade-off is more code to write, but the result matches the design exactly without fighting a library's opinions.

### Reanimated for Compass Animation

The wind compass needle uses `react-native-reanimated` for its spring animation. Reanimated runs animations on the native UI thread rather than the JavaScript thread, ensuring smooth 60fps performance even when the JS thread is busy processing data. The spring physics (`withSpring` with damping and stiffness parameters) give the needle a natural, physical feel when the wind direction changes.

### Vector Icons via @expo/vector-icons

All icons use Ionicons and MaterialCommunityIcons from `@expo/vector-icons`, which ships with Expo. This provides consistent rendering across iOS and Android (emoji rendering varies by OS version), precise size and color control through props, and a professional appearance. A centralized `WeatherIcon` component maps WMO weather codes to specific icon names with contextual colors (sun icons in yellow, rain icons in blue, and so on).

### StyleSheet.create for Styling

React Native's built-in `StyleSheet.create` was chosen over CSS-in-JS libraries (styled-components, NativeWind) because it has zero runtime overhead, requires no additional dependencies or build configuration, and is immediately familiar to any React Native developer. Design tokens are centralized in `src/constants/theme.ts`, providing the same consistency benefits that a design system library would offer.

### Transform Layer Between API and App Types

The Open-Meteo API returns data in snake_case with parallel arrays (e.g., `time[]`, `temperature_2m[]` as separate arrays that must be zipped by index). The transform layer in `src/api/weather.ts` converts this into structured objects with camelCase fields. This decouples the UI from the API shape entirely -- if Open-Meteo changes their response format, only the transform functions need updating.

---

## Component Design

### Reusable Components

| Component | Used By | Purpose |
|-----------|---------|---------|
| Card | Hourly, Wind and Air, Forecast | Dark glass-effect container with border |
| Header | All four screens | App branding, location picker trigger, refresh timer |
| RefreshTimer | Header | SVG circular countdown with manual refresh button |
| LocationPicker | Header | Bottom sheet modal for switching cities |
| TabSelector | Hourly | Pill-style toggle between Temperature, Wind Speed, Humidity |
| WeatherIcon | Now, Hourly, Forecast | Maps WMO weather codes to Ionicons |
| LoadingOverlay | All four screens | Animated fade overlay during background refresh |
| ErrorView | All four screens | Error message with retry button |
| GradientBackground | All four screens | Dark gradient backdrop |
| TempRangeBar | DaySnapshot, DayForecastCard | Gradient bar showing temperature range relative to global min-max |

### Screen-Specific Components

**Now screen:** CurrentWeather (hero temperature display), WeatherStatGrid (six-stat grid), NextHoursStrip (horizontal scrollable hour cards).

**Hourly screen:** ForecastChart (custom SVG area chart with gradient fill, grid lines, axis labels, and NOW marker), HourlyCards (scrollable cards with weather icon, temperature, and wind speed).

**Wind and Air screen:** WindCompass (SVG compass rose with animated needle, speed arc, cardinal labels, info cards, and Beaufort scale bar), HumidityGauge (SVG arc gauge with percentage), PressureGauge (linear bar with standard atmosphere marker), UVIndexScale (color-coded dot scale).

**Forecast screen:** DaySnapshot (compact five-day list with temperature range bars), DayForecastCard (detailed day card with temperature range bar, weather icon, and precipitation probability).

---

## Auto-Refresh Mechanism

The auto-refresh system works through the cooperation of several pieces:

1. React Query's `refetchInterval` option is set to 180,000 milliseconds (three minutes). This triggers a background fetch at that interval automatically.

2. The `staleTime` is also set to three minutes, matching the refetch interval. This means data is considered fresh for the entire interval, preventing unnecessary re-fetches when navigating between tabs.

3. During a background refetch, the existing data remains visible. React Query's stale-while-revalidate pattern ensures there is no screen flicker or loading spinner replacing content.

4. The `isRefetching` boolean from React Query triggers a subtle `LoadingOverlay` component that fades in and out using Reanimated's entering/exiting animations.

5. The `useRefreshTimer` hook calculates the remaining seconds until the next refetch by comparing the current time against `data.fetchedAt`. It updates every second.

6. The `RefreshTimer` component in the header renders an SVG circular progress indicator that visually counts down, plus a manual refresh button that calls React Query's `refetch()` function.

---

## Location Switching

The app supports five preset locations: Accra (default), London, Berlin, Buenos Aires, and San Francisco. These are defined in `src/constants/weather.ts` with their latitude, longitude, city name, and country.

The `LocationContext` provider wraps the entire app in the root layout. It exposes the current location and a setter function through the `useLocation()` hook. The Header component renders the current location name with a down-chevron icon. Tapping it opens the `LocationPicker`, a modal bottom sheet that lists all available cities with the active one highlighted.

When a new location is selected, the context updates and every screen that calls `useWeatherData()` re-renders. Because React Query's cache key includes the latitude and longitude (`['weather', lat, lon]`), switching location triggers a fresh API call. Previously fetched data for other locations remains in the cache, so switching back is instant.
