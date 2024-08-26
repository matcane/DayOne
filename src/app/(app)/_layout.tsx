import { Feather } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";
import { useTheme } from "react-native-paper";

export default function AppLayout() {
  const theme = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: {
          paddingBottom: 5,
          borderTopColor: theme.colors.secondary,
          backgroundColor: theme.colors.background,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Add Workout",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="create" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerShown: false,
          tabBarIcon: ({ size, color }) => <Octicons name="history" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ size, color }) => <Feather name="user" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
