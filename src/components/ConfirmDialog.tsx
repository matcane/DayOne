import { Button, Dialog, Portal, useTheme } from "react-native-paper";

export default function ConfirmDialog({
  visible,
  label,
  onDismiss,
  fnConfirm,
}: {
  visible: boolean;
  label: string;
  onDismiss: () => void;
  fnConfirm: () => void;
}) {
  const theme = useTheme();

  const ooConfirm = () => {
    fnConfirm();
    onDismiss();
  };

  return (
    <Portal theme={theme}>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Icon icon="alert" />
        <Dialog.Title style={{ textAlign: "center" }}>{label}</Dialog.Title>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={ooConfirm}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
