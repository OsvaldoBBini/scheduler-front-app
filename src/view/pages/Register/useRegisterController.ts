import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from 'react-hot-toast'

import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../app/services/authService";
import { SignupParams } from "../../../app/services/authService/signup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
  name: z.string().min(1,'Nome é obrigatório'),
  email: z.string().email('Informe um e-mail válido'),
  password: z.string().min(8, 'Senha deve conter pelo menos 8 dígitos')
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const { setUserEmail } = useAuth();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (data: SignupParams ) => { return authService.signup(data); }
  })

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      setUserEmail(data.email);
      await mutateAsync(data);
      navigate('/confirmation')
    } catch {
      toast.error('Ocorreu um erro ao criar sua conta!!');
    }
  });

  return { register, errors, handleSubmit, isPending }
}