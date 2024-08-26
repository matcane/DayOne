import { FlashList } from "@shopify/flash-list";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { View, TextInput as DefaultInput } from "react-native";
import { Button, DataTable, TextInput, Text, useTheme, MD3Theme } from "react-native-paper";

import DefaultView from "@/components/DefaultView";
import useExerciseStore, { TSet } from "@/store/exerciseStore";
import useWorkoutStore from "@/store/workoutStore";

const MyComponent = ({ item, theme }: { item: TSet; theme: MD3Theme }) => {
  const updateSetReps = useExerciseStore((state) => state.updateSetReps);
  const updateSetWeight = useExerciseStore((state) => state.updateSetWeight);

  return (
    <DataTable.Row style={{ paddingVertical: 5 }}>
      <DataTable.Cell>
        <Text>Set {item.id}</Text>
      </DataTable.Cell>
      <DataTable.Cell numeric>
        <DefaultInput
          onChangeText={(text) => updateSetReps(item.id, parseInt(text, 10))}
          placeholderTextColor={theme.colors.primary}
          style={{
            color: theme.colors.primary,
            borderWidth: 1,
            marginRight: -10,
            height: "100%",
            width: "50%",
            textAlign: "center",
          }}
          placeholder="0"
          inputMode="numeric"
          maxLength={3}
        />
      </DataTable.Cell>
      <DataTable.Cell numeric>
        <DefaultInput
          onChangeText={(text) => updateSetWeight(item.id, parseInt(text, 10))}
          placeholderTextColor={theme.colors.primary}
          style={{
            color: theme.colors.primary,
            marginRight: -10,
            borderWidth: 1,
            height: "100%",
            width: "50%",
            textAlign: "center",
          }}
          placeholder="0"
          inputMode="numeric"
          maxLength={3}
        />
      </DataTable.Cell>
    </DataTable.Row>
  );
};

export default function Exercise() {
  const exercise = useExerciseStore();
  const addExercise = useWorkoutStore((state) => state.addExercise);
  const theme = useTheme();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerTitle: exercise.name });
  }, [exercise.name, navigation]);

  return (
    <DefaultView>
      <TextInput
        autoFocus={exercise.name ? false : true}
        mode="outlined"
        label="Exercise"
        value={exercise.name}
        onChangeText={(text) => exercise.setExerciseName(text)}
      />
      <View style={{ flexGrow: 1, padding: 10, gap: 20 }}>
        <DataTable.Header>
          <DataTable.Title>Set</DataTable.Title>
          <DataTable.Title numeric>Reps</DataTable.Title>
          <DataTable.Title numeric>Weight (kg)</DataTable.Title>
        </DataTable.Header>

        <FlashList
          data={exercise.sets}
          contentContainerStyle={{ paddingHorizontal: 0 }}
          renderItem={({ item }) => <MyComponent item={item} theme={theme} />}
          estimatedItemSize={10}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 20,
        }}>
        <Button mode="contained" onPressOut={exercise.addSet}>
          Add set
        </Button>
        <Button
          disabled={exercise.sets.length > 0 ? false : true}
          mode="contained"
          onPressOut={exercise.deleteSet}>
          Delete set
        </Button>
        <Button
          disabled={exercise.sets.length > 0 && exercise.name ? false : true}
          mode="contained"
          onPressOut={() => {
            router.back();
            console.log(exercise.sets);
            addExercise({ id: exercise.id, name: exercise.name, sets: exercise.sets });
            exercise.vipeData();
          }}>
          Confirm
        </Button>
      </View>
    </DefaultView>
  );
}
