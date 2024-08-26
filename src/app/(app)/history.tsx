import auth from "@react-native-firebase/auth";
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Text, ActivityIndicator, List, useTheme } from "react-native-paper";

import { DefaultList } from "@/components/DefaultList";
import DefaultView from "@/components/DefaultView";

export default function Page() {
  const theme = useTheme();
  const [workouts, setWorkouts] =
    useState<FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData> | null>();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("workouts")
      .where("author_uid", "==", auth().currentUser?.uid)
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        setWorkouts(snapshot);
      });
    return unsubscribe;
  }, []);

  if (!workouts) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  if (workouts.docs.length === 0) {
    return (
      <DefaultView>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text variant="displayMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            No history
          </Text>
        </View>
      </DefaultView>
    );
  }

  return (
    <DefaultView>
      <FlatList
        data={workouts.docs}
        renderItem={({ item }) => (
          <List.Section key={item.id}>
            <List.Accordion
              style={{ backgroundColor: theme.colors.inversePrimary }}
              titleStyle={{
                color: theme.colors.tertiary,
                fontSize: theme.fonts.titleLarge.fontSize,
              }}
              title={new Date(item.data().date.toDate()).toDateString()}>
              <FlatList
                data={item.data().exercises}
                style={{ paddingHorizontal: 10 }}
                renderItem={({ item }) => <DefaultList item={item} />}
              />
            </List.Accordion>
          </List.Section>
        )}
      />
    </DefaultView>
  );
}
