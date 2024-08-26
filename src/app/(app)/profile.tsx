import auth from "@react-native-firebase/auth";
import { View } from "react-native";
import { Button } from "react-native-paper";

import DefaultView from "@/components/DefaultView";

export default function Page() {
  return (
    <DefaultView>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button mode="outlined" onPress={() => auth().signOut()}>
          Logout
        </Button>
      </View>
    </DefaultView>
  );
}
