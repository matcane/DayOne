const isEasBuild = process.env.EAS_BUILD === "true";

module.exports = {
  expo: {
    name: "DayOne",
    slug: "day-one",
    version: "1.0.0",
    scheme: "day-one",
    orientation: "portrait",
    platforms: ["android"],
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "automatic",
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#000000",
      },
      splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#fffbff",
        dark: {
          image: "./assets/images/splash.png",
          resizeMode: "contain",
          backgroundColor: "#1d1b1e",
        },
      },
      package: "com.matcane.dayone",
      googleServicesFile: isEasBuild ? process.env.GOOGLE_SERVICES_JSON : "./google-services.json",
    },
    plugins: [
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      "expo-router",
      [
        "expo-build-properties",
        {
          android: {
            enablePngCrunchInReleaseBuilds: true,
            enableProguardInReleaseBuilds: true,
            enableShrinkResourcesInReleaseBuilds: true,
            useLegacyPackaging: true,
          },
        },
      ],
    ],
    extra: {
      eas: {
        projectId: process.env.EAS_BUILD_PROJECT_ID,
      },
    },
  },
};
