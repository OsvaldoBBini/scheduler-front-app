import { Input } from "./Input";
import { Button } from "./Button";
import { useAuth } from "../../app/hooks/useAuth";
import { QueryObserverResult, RefetchOptions, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ModalContainer } from "./Modal";
import { ICategory } from "../../app/services/appointmentCategoryService/showAppointmentCategory";
import { appointmentCategoryService } from "../../app/services/appointmentCategoryService";
import { CreateAppointmentCategory } from "../../app/services/appointmentCategoryService/createAppointmentCategory";
import { UpdateAppointmentCategory } from "../../app/services/appointmentCategoryService/updateAppointmentCategory";

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
    resolver: zodResolver(schema),
    defaultValues: defaultValues ? { appointmentTypeName: defaultValues.appointmentTypeName, appointmentTypePrice: defaultValues.appointmentTypePrice } : {appointmentTypeName: '', appointmentTypePrice: ''}
  });

  const { mutateAsync: createCategory, isPending: isCreationPending } = useMutation({
    mutationKey: ['createCategory'],
    mutationFn: async (data: CreateAppointmentCategory ) => { return appointmentCategoryService.create(data); }
  });

  const { mutateAsync: updateCategory, isPending: isUpdatePending } = useMutation({
    mutationKey: ['updateCategory'],
    mutationFn: async (data: UpdateAppointmentCategory ) => { return appointmentCategoryService.update(data); }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    if (defaultValues && refetchCategories) {
      await updateCategory({...data, userId: profileData!.sub, appointmentTypeId: defaultValues.appointmentTypeId})
      .then(() => {
        toast.success('Categoria atualizada com sucesso!')
        refetchCategories();
        onNewCategory();
      })
      .catch(() => toast.error('Não foi possível atualizar a categoria'))
    }
    else {
      await createCategory({...data, userId: profileData!.sub})
        .then(() => toast.success('Categoria cadastrado com sucesso!!'))
        .catch(() => {
          toast.error('Não foi possivel cadastrar seu novo tipo!')}
        );
    }
  });

  return (
        <ModalContainer isOpen={isOpen} onModal={onNewCategory} title={defaultValues ? 'Editar Categoria' : 'Criar Categoria'} className={`${defaultValues ? 'bg-transparent' : 'bg-black'}`}>
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
        </ModalContainer>
  )
}