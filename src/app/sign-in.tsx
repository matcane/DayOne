import { router } from "expo-router";
import { Pressable } from "react-native";
import { Text } from "react-native-paper";

import DefaultView from "@/components/DefaultView";

export default function SignIn() {
  const onPress = () => {
    router.replace("(app)");
  };
  return (
    <DefaultView>
      <Pressable onPress={onPress}>
        <Text variant="titleLarge">Login</Text>
      </Pressable>
    </DefaultView>
  );
}
