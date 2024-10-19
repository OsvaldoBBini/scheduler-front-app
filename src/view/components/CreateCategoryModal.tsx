 import { X } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { Input } from "./Input";
import { Button } from "./Button";
import { useAuth } from "../../app/hooks/useAuth";
import { QueryObserverResult, RefetchOptions, useMutation } from "@tanstack/react-query";
import { appointmentTypeService } from "../../app/services/appointmentTypeService";
import { CreateAppointmentType } from "../../app/services/appointmentTypeService/createAppointmentType";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { hide, show } from "../../app/utils/style";
import { ICategory } from "./EditCategoryModal";
import { UpdateAppointmentType } from "../../app/services/appointmentTypeService/updateAppointmentType";

const schema = z.object({
  appointmentTypeName: z.string().min(1, 'Informe um tipo válido'),
  appointmentTypePrice: z.string().regex(/^\d+(\.\d+)?/, 'Informe um valor válido')
})

type FormData = z.infer<typeof schema>

interface ICreateCategoryModal {
  onNewCategory: () => void;
  isOpen: boolean;
  defaultValues?: ICategory | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refetchCategories?: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>
}

export function CreateCategoryModal({onNewCategory, isOpen, defaultValues, refetchCategories}: ICreateCategoryModal) {

  const { profileData } = useAuth();

  const { handleSubmit: hookFormSubmit, register, formState: {errors} } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync: createType, isPending: isCreationPending } = useMutation({
    mutationKey: ['createType'],
    mutationFn: async (data: CreateAppointmentType ) => { return appointmentTypeService.create(data); }
  });

  const { mutateAsync: updateType, isPending: isUpdatePending } = useMutation({
    mutationKey: ['updateType'],
    mutationFn: async (data: UpdateAppointmentType ) => { return appointmentTypeService.update(data); }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    if (defaultValues && refetchCategories) {
      await updateType({...data, userId: profileData!.sub, appointmentTypeId: defaultValues.SK.split("#")[1]})
      .then(() => {
        toast.success('Categoria atualizada com sucesso!')
        refetchCategories();
        onNewCategory();
      })
      .catch(() => toast.error('Não foi possível atualizar a categoria'))
    }
    else {
      await createType({...data, userId: profileData!.sub})
        .then(() => toast.success('Categoria cadastrado com sucesso!!'))
        .catch(() => {
          toast.error('Não foi possivel cadastrar seu novo tipo!')}
        );
    }
  });

  return (
    <motion.div className={`h-full w-full ${defaultValues ? 'bg-transparent' : 'bg-black'} fixed left-0 top-0 z-10 bg-opacity-75`} animate={isOpen ? show : hide}>
      <div className="flex items-center justify-center w-full h-full">
        <div className="bg-white md:w-1/3 w-4/5 sm:h-2/4 h-3/5 rounded-lg p-3">
          <header className="flex justify-between">
            <h1 className="text-xl">
              { defaultValues ? 'Editar Categoria' : 'Criar Categoria'}
            </h1>
            <button onClick={onNewCategory}>
              <X size={28}/>
            </button>
          </header>

          <section className="flex flex-col justify-center mt-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
              <Input {...register('appointmentTypeName')} name="appointmentTypeName" defaultValue={defaultValues?.appointmentTypeName} placeholder="Nome da Catogoria"
              error={errors.appointmentTypeName?.message}/>
              <Input {...register('appointmentTypePrice')} name="appointmentTypePrice" defaultValue={defaultValues?.appointmentTypePrice} placeholder="Preço Cobrado"
              error={errors.appointmentTypePrice?.message}/>
              <Button type="submit" isPending={isCreationPending || isUpdatePending} disabled={isCreationPending || isUpdatePending}>
                {defaultValues ? 'Salvar' : 'Cadastrar'}
              </Button>
            </form>
          </section>

        </div>
      </div>
    </motion.div>
  )
}