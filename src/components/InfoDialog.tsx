import { Text, Button, Dialog, Portal, useTheme } from "react-native-paper";

export default function InfoDialog({
  visible,
  errorMessage,
  onDismiss,
}: {
  visible: boolean;
  errorMessage: string;
  onDismiss: () => void;
}) {
  const theme = useTheme();
  return (
    <Portal theme={theme}>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Content>
          <Text variant="bodyMedium">{errorMessage}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
