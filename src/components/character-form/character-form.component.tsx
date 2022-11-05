import { useForm } from "react-hook-form";

import { Form } from "components";
import { Container } from "./character-form.styles";

export function CharacterForm() {
  const { control, handleSubmit } = useForm();

  function handleCreateCharacterSubmit(data: any) {
    console.log(data);
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(handleCreateCharacterSubmit)}>
        <Form.Input control={control} name="name" label="Nome" />

        <button>Criar</button>
      </form>
    </Container>
  );
}
