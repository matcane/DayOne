import { Feather } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { router } from "expo-router";
import { useState } from "react";
import * as React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { AnimatedFAB, Button, Text, useTheme } from "react-native-paper";

import ConfirmDialog from "@/components/ConfirmDialog";
import { DefaultList } from "@/components/DefaultList";
import DefaultView from "@/components/DefaultView";
import useWorkoutStore from "@/store/workoutStore";

export default function Page() {
  const theme = useTheme();
  const exercises = useWorkoutStore((state) => state.exercises);
  const deleteExercise = useWorkoutStore((state) => state.deleteExercise);
  const vipeData = useWorkoutStore((state) => state.vipeData);
  const [date, setDate] = useState(new Date());
  const [visibleDeleteDialog, setVisibleDeleteDialog] = useState(false);
  const [visibleSaveDialog, setVisibleSaveDialog] = useState(false);

  const addToFirebase = async () => {
    await firestore()
      .collection("workouts")
      .add({ author_uid: auth().currentUser?.uid, date: date, exercises: exercises })
      .then(() => console.log("Workout added!"));
  };

  const onChange = (_event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      style: { backgroundColor: "#ff0000", borderColor: "#ff0000" },
      value: date,
      onChange,
      mode: "date",
      is24Hour: true,
    });
  };

  if (exercises.length < 0) {
    return (
      <View
        style={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ff0000",
        }}></View>
    );
  }
  return (
    <DefaultView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: theme.colors.primaryContainer,
          borderRadius: 20,
          paddingHorizontal: 10,
          gap: 20,
        }}>
        <ConfirmDialog
          visible={visibleDeleteDialog}
          label="Delete all exercises?"
          onDismiss={() => setVisibleDeleteDialog(false)}
          fnConfirm={() => vipeData()}
        />
        <Pressable
          disabled={exercises.length > 0 ? false : true}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => setVisibleDeleteDialog(true)}>
          <Feather name="x" size={24} color={theme.colors.onBackground} />
        </Pressable>

        <Pressable onPress={showDatepicker}>
          <Text variant="titleLarge">{date.toLocaleString().split(",")[0]}</Text>
        </Pressable>
        <ConfirmDialog
          visible={visibleSaveDialog}
          label="Save workout?"
          onDismiss={() => setVisibleSaveDialog(false)}
          fnConfirm={() => {
            vipeData();
            addToFirebase();
          }}
        />
        <Pressable
          disabled={exercises.length > 0 ? false : true}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => setVisibleSaveDialog(true)}>
          <Feather name="check" size={24} color={theme.colors.onBackground} />
        </Pressable>
      </View>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        {exercises.length === 0 ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text variant="displayMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              Add exercises
            </Text>
          </View>
        ) : (
          <FlatList
            data={exercises}
            contentContainerStyle={{
              paddingBottom: 55,
            }}
            renderItem={({ item }) => (
              <DefaultList item={item}>
                <View
                  style={{
                    padding: 10,
                    justifyContent: "flex-end",
                    gap: 20,
                  }}>
                  <Button
                    mode="contained"
                    buttonColor={theme.colors.error}
                    textColor={theme.colors.onError}
                    onPress={() => deleteExercise(item.id)}>
                    Delete
                  </Button>
                </View>
              </DefaultList>
            )}
          />
        )}

        <View style={{ alignItems: "center" }}>
          <AnimatedFAB
            icon={"plus"}
            label={"Label"}
            extended={false}
            onPress={() => router.push("(modals)/exercise")}
            style={[styles.fabStyle, { color: theme.colors.onBackground }]}
          />
        </View>
      </View>
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  fabStyle: {
    bottom: 10,
    right: 10,
    position: "absolute",
  },
});
