import { DefaultTheme, MD3DarkTheme } from "react-native-paper";

const fontConfig = {
  displayLarge: {
    fontFamily: "ModerusticRegular",
    fontSize: 57,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 64,
  },
  displayMedium: {
    fontFamily: "ModerusticMedium",
    fontSize: 45,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 52,
  },
  displaySmall: {
    fontFamily: "ModerusticLight",
    fontSize: 36,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 44,
  },
  headlineLarge: {
    fontFamily: "ModerusticRegular",
    fontSize: 32,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 40,
  },
  headlineMedium: {
    fontFamily: "ModerusticMedium",
    fontSize: 28,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 36,
  },
  headlineSmall: {
    fontFamily: "ModerusticLight",
    fontSize: 24,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 32,
  },
  titleLarge: {
    fontFamily: "ModerusticRegular",
    fontSize: 22,
    fontWeight: "400" as const,
    letterSpacing: 0,
    lineHeight: 28,
  },
  titleMedium: {
    fontFamily: "ModerusticMedium",
    fontSize: 16,
    fontWeight: "500" as const,
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  titleSmall: {
    fontFamily: "ModerusticLight",
    fontSize: 14,
    fontWeight: "500" as const,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelLarge: {
    fontFamily: "ModerusticRegular",
    fontSize: 14,
    fontWeight: "500" as const,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelMedium: {
    fontFamily: "ModerusticMedium",
    fontSize: 12,
    fontWeight: "500" as const,
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelSmall: {
    fontFamily: "ModerusticLight",
    fontSize: 11,
    fontWeight: "500" as const,
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  bodyLarge: {
    fontFamily: "ModerusticRegular",
    fontSize: 16,
    fontWeight: "400" as const,
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: "ModerusticMedium",
    fontSize: 14,
    fontWeight: "400" as const,
    letterSpacing: 0.25,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: "ModerusticLight",
    fontSize: 12,
    fontWeight: "400" as const,
    letterSpacing: 0.4,
    lineHeight: 16,
  },
};

const lightTheme = {
  ...DefaultTheme,
  fonts: {
    ...DefaultTheme.fonts,
    ...fontConfig,
  },
  colors: {
    ...DefaultTheme.colors,
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  fonts: {
    ...MD3DarkTheme.fonts,
    ...fontConfig,
  },
  colors: {
    ...MD3DarkTheme.colors,
  },
};

export { lightTheme, darkTheme };
