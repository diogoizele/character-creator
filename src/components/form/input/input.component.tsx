import { InputHTMLAttributes } from "react";
import { Control, Controller } from "react-hook-form";

import { Container, Error, Field, Label } from "./input.styles";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  control: Control;

  error?: string;
}

export function Input({ name, label, error, control, ...rest }: Props) {
  return (
    <Container>
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field: { value = "", onChange } }) => (
          <Field {...rest} value={value} onChange={onChange} />
        )}
      />
      <Error>{error}</Error>
    </Container>
  );
}
