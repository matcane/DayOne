import { Link } from "expo-router";
import { View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { formStyles } from "@/utils/formStyles";
import { useFormInput, usePasswordVisibility, canSubmitForm } from "@/utils/formUtils";

type AuthFormProps = {
  title: string;
  buttonText: string;
  linkText: string[];
  linkHref: string;
  onSubmit: (email: string, password: string) => void;
};

export default function AuthForm({
  title,
  buttonText,
  linkText,
  linkHref,
  onSubmit,
}: AuthFormProps) {
  const theme = useTheme();

  const email = useFormInput("");
  const password = useFormInput("");
  const passwordVisibility = usePasswordVisibility();

  const canSubmit = canSubmitForm([email.value, password.value]);

  return (
    <SafeAreaView style={[formStyles.container, { backgroundColor: theme.colors.background }]}>
      <View style={formStyles.formContent}>
        <Text variant="titleLarge" style={formStyles.title}>
          {title}
        </Text>
        <TextInput mode="outlined" label="Email" {...email} />
        <TextInput
          mode="outlined"
          label="Password"
          secureTextEntry={passwordVisibility.visible}
          right={<TextInput.Icon icon="eye" onPress={passwordVisibility.toggleVisibility} />}
          {...password}
        />
        <Text style={formStyles.linkText}>
          {linkText[0]}{" "}
          <Link href={linkHref} replace style={{ color: theme.colors.primary }}>
            {linkText[1]}
          </Link>
        </Text>
      </View>

      <Button
        disabled={!canSubmit}
        mode="contained"
        onPress={() => onSubmit(email.value, password.value)}>
        {buttonText}
      </Button>
    </SafeAreaView>
  );
}
