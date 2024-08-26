import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { useEffect, useState } from "react";
import { useColorScheme, View } from "react-native";
import { ActivityIndicator, PaperProvider } from "react-native-paper";

import InfoDialog from "@/components/InfoDialog";
import useAuthStore from "@/store/authStore";
import { lightTheme, darkTheme } from "@/theme";

import useUser from "./hooks/useUser";

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
  const router = useRouter();
  const isLoading = useAuthStore((state) => state.isLoading);
  const errorData = useAuthStore((state) => state.errorData);
  const clearError = useAuthStore((state) => state.clearError);
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const rootBackground =
    colorScheme === "dark" ? darkTheme.colors.background : lightTheme.colors.background;

  const { user } = useUser();

  useEffect(() => {
    const prepareApp = async () => {
      if (isLoading) return;

      if (!user) {
        router.replace("sign-in");
      } else {
        router.replace("(app)");
      }
      await SystemUI.setBackgroundColorAsync(rootBackground);
      await SplashScreen.hideAsync();
    };

    prepareApp();
  }, [isLoading, rootBackground, router, theme, user]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: rootBackground,
        }}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <InfoDialog
        visible={errorData ? true : false}
        onDismiss={clearError}
        errorMessage={errorData}
      />
      <Stack>
        <Stack.Screen
          name="(app)"
          options={{
            headerShown: false,
            animation: "fade",
            navigationBarColor: theme.colors.background,
            statusBarColor: theme.colors.background,
            statusBarStyle: colorScheme === "dark" ? "light" : "dark",
          }}
        />
        <Stack.Screen
          name="(modals)/exercise"
          options={{
            presentation: "modal",
            animation: "fade",
            headerTitle: "",
            headerTintColor: theme.colors.primary,
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            navigationBarColor: theme.colors.background,
            statusBarColor: theme.colors.background,
            statusBarStyle: colorScheme === "dark" ? "light" : "dark",
          }}
        />
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
            animation: "fade",
            navigationBarColor: theme.colors.background,
            statusBarColor: theme.colors.background,
            statusBarStyle: colorScheme === "dark" ? "light" : "dark",
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
            animation: "fade",
            navigationBarColor: theme.colors.background,
            statusBarColor: theme.colors.background,
            statusBarStyle: colorScheme === "dark" ? "light" : "dark",
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
