export const Colors = {
  // Core palette — dark theme
  background: "#0a0a1a",
  backgroundGradientStart: "#0f0f2e",
  backgroundGradientEnd: "#0a0a1a",

  // Card colors
  card: "#1a1a3e",
  cardBorder: "rgba(255, 255, 255, 0.08)",
  cardHighlight: "#22224a",

  // Text
  foreground: "#ffffff",
  foregroundSecondary: "rgba(255, 255, 255, 0.7)",
  foregroundMuted: "rgba(255, 255, 255, 0.45)",

  // Primary accent
  primary: "#4a6cf7",
  primaryLight: "#6b8cff",

  // Chart colors
  chartOrange: "#f59e0b",
  chartBlue: "#3b82f6",
  chartGreen: "#10b981",
  chartPurple: "#8b5cf6",
  chartRed: "#ef4444",

  // Status / gauge colors
  uvLow: "#22c55e",
  uvModerate: "#eab308",
  uvHigh: "#f97316",
  uvVeryHigh: "#ef4444",
  uvExtreme: "#9333ea",

  // Tab bar
  tabBarBackground: "#0d0d28",
  tabBarActive: "#4a6cf7",
  tabBarInactive: "rgba(255, 255, 255, 0.4)",

  // Temperature bar gradient
  tempBarCool: "#3b82f6",
  tempBarWarm: "#f59e0b",
  tempBarHot: "#ef4444",

  // Misc
  border: "rgba(255, 255, 255, 0.1)",
  overlay: "rgba(0, 0, 0, 0.5)",
  white: "#ffffff",
  black: "#000000",
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const BorderRadius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 9999,
} as const;

export const FontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 28,
  xxxl: 48,
  hero: 64,
} as const;

export const FontWeight = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
};
