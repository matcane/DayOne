import { useState } from "react";

export function useFormInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const onChangeText = (text: string) => setValue(text);
  return { value, onChangeText };
}

export function usePasswordVisibility(initialVisibility = true) {
  const [visible, setVisible] = useState(initialVisibility);
  const toggleVisibility = () => setVisible((prev) => !prev);
  return { visible, toggleVisibility };
}

export function canSubmitForm(inputs: string[]): boolean {
  return inputs.every((input) => input.length > 0);
}
