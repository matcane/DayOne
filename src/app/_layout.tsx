import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";

import { lightTheme, darkTheme } from "@/theme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ModerusticLight: require("@assets/fonts/Moderustic-Light.ttf"),
    ModerusticRegular: require("@assets/fonts/Moderustic-Regular.ttf"),
    ModerusticMedium: require("@assets/fonts/Moderustic-Medium.ttf"),
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      setAppIsReady(true);
    }
  }, [loaded]);

  if (!appIsReady) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  const user = false;

  useEffect(() => {
    const prepareApp = async () => {
      if (!user) {
        router.replace("/sign-in");
      }
      await SplashScreen.hideAsync();
    };

    prepareApp();
  }, [user]);

  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
