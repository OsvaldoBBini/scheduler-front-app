import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SigninParams } from "../../../app/services/authService/signin";
import { authService } from "../../../app/services/authService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "../../../app/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email('Informe um e-mail válido'),
  password: z.string().min(8, 'Senha deve conter pelo menos 8 dígitos')
})

type FormData = z.infer<typeof schema>

export function useLoginController() {

  const navigate = useNavigate();
  const { setUserEmail, email } = useAuth();

  const { handleSubmit: hookFormSubmit, register, formState: {errors} } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['signin'],
    mutationFn: async (data: SigninParams ) => { return authService.signin(data); }
  })

  const { signin } = useAuth();

  const handleSubmit = hookFormSubmit(async (data) => {
      setUserEmail(data.email);
      await mutateAsync(data)
        .then(({accessToken}) => signin(accessToken))
        .catch((error) => {
          if(error.status === 401) {
            navigate('/confirmation');
          }
          toast.error(error.response.data.error)}
        );
  });

  return { handleSubmit, register, errors, isPending, email };
}