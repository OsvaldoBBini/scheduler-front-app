import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { ConfirmationAccountParams } from "../../../app/services/authService/confirmAccount";
import { authService } from "../../../app/services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
  confirmationCode: z.string().min(6, 'O código deve conter 6 digitos')
});

type FormData = z.infer<typeof schema>

export function useAccountValidation() {

  const { email } = useAuth();
  const { handleSubmit: hookFormSubmit, register, formState: {errors} } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['confirmation'],
    mutationFn: async (data: ConfirmationAccountParams ) => { return authService.confirmAccount(data); }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({...data, email});
      navigate('/login')
    } catch {
      toast.error('Ocorreu um erro ao validar sua conta!!');
    }
  });

  return { handleSubmit, isPending, register, errors }

}