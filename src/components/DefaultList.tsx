import { PropsWithChildren } from "react";
import { FlatList } from "react-native";
import { useTheme, List, DataTable } from "react-native-paper";

import { TExercise } from "@/store/exerciseStore";

export const DefaultList = ({ item, children }: PropsWithChildren<{ item: TExercise }>) => {
  const theme = useTheme();

  return (
    <List.Section style={{ backgroundColor: theme.colors.backdrop }}>
      <List.Accordion style={{ backgroundColor: theme.colors.backdrop }} title={item.name}>
        <DataTable.Header>
          <DataTable.Title>Set</DataTable.Title>
          <DataTable.Title numeric>Reps</DataTable.Title>
          <DataTable.Title numeric>Weight (kg)</DataTable.Title>
        </DataTable.Header>
        <FlatList
          data={item.sets}
          renderItem={({ item }) => (
            <DataTable.Row>
              <DataTable.Cell>{"Set " + item.id}</DataTable.Cell>
              <DataTable.Cell numeric>{item.reps}</DataTable.Cell>
              <DataTable.Cell numeric>{item.weight}</DataTable.Cell>
            </DataTable.Row>
          )}
        />
        {children}
      </List.Accordion>
    </List.Section>
  );
};
