import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authService } from "../../../app/services/authService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "../../../app/hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ResetPasswordParams } from "../../../app/services/authService/resetPassword";

const schema = z.object({
  password: z.string().min(8, 'Senha deve conter pelo menos 8 dígitos').regex(/(?=.*[a-z])(?=.*[A-Z])/, {
    message: "A senha deve possuir ao menos uma letra maíscula e uma minúscula",
  })
});

type FormData = z.infer<typeof schema>

export function useResetPassword() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUserEmail } = useAuth();

  const code = searchParams.get('code');
  const email = searchParams.get('email');

  const { handleSubmit: hookFormSubmit, register, formState: {errors} } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: async (data: ResetPasswordParams ) => { return authService.resetPassword(data); }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
      setUserEmail(email!);
      await mutateAsync({newPassword: data.password, email: email!, code: code!})
        .then(
          () => {
            navigate('/')
            toast.success('Troca efetuada com sucesso!!')
          }
        )
        .catch((error) => {
          toast.error(error.response.data.error)}
        );
  });

  return { handleSubmit, register, errors, isPending };
}