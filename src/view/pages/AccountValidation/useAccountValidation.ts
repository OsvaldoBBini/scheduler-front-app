import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  confirmationCode: z.string().min(6, 'O código deve conter 6 digitos')
});

type FormData = z.infer<typeof schema>

export function useAccountValidation() {

  const { handleSubmit: hookFormSubmit, register, formState: {errors} } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  return { register, errors }

}