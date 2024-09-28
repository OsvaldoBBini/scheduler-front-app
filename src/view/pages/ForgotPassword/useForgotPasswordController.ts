import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authService } from "../../../app/services/authService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "../../../app/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordParams } from "../../../app/services/authService/forgotPassword";

const schema = z.object({
  email: z.string().email('Informe um e-mail válido'),
});

type FormData = z.infer<typeof schema>

export function useForgotPasswordController() {

  const navigate = useNavigate();
  const { setUserEmail } = useAuth();

  const { handleSubmit: hookFormSubmit, register, formState: {errors} } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['forgotPassword'],
    mutationFn: async (data: ForgotPasswordParams ) => { return authService.forgotPassword(data); }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
      setUserEmail(data.email);
      await mutateAsync(data)
        .then(() => navigate('/'))
        .catch((error) => {
          if(error.status === 401) {
            navigate('/confirmation');
          }
          toast.error(error.response.data.error)}
        );
  });

  return { handleSubmit, register, errors, isPending };
}