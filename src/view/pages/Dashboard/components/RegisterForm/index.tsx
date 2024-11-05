import { X } from "@phosphor-icons/react";
import { Input } from "../../../../components/Input";
import { Button } from "../../../../components/Button";
import { Select } from "../../../../components/Select";
import { appointmentCategoryService } from "../../../../../app/services/appointmentCategoryService";
import { useAuth } from "../../../../../app/hooks/useAuth";
import { ICategory } from "../../../../../app/services/appointmentCategoryService/showAppointmentCategory";
import { QueryObserverResult, RefetchOptions, useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { appointmentService } from "../../../../../app/services/appointmentsService";
import toast from "react-hot-toast";
import { CreateAppointment } from "../../../../../app/services/appointmentsService/createAppointment";
import { IAppointment } from "../../../../../app/services/appointmentsService/showAppointments";
import { useEffect } from "react";
import { UpdateAppointment } from "../../../../../app/services/appointmentsService/updateAppointment";

interface IRegisterForm {
  isOpen: boolean;
  onRegister: () => void;
  defaultValues?: IAppointment | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refetchAppointments: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>
}

const schema = z.object({
  name: z.string().min(1, 'Informe um nome válido'),
  phoneNumber: z.string().regex(/^\d{1,2}\d{9,10}$/, 'Informe um número válido'),
  date: z.string().min(1, 'Informe uma data válida'),
  startAt: z.string().min(1, 'Informe o horário de início'),
  endsAt: z.string().min(1, 'Informe o horário de fim'),
  category: z.string().min(1, 'Informe uma categoria'),
})

type FormData = z.infer<typeof schema>


export function RegisterForm({isOpen, onRegister, defaultValues, refetchAppointments}: IRegisterForm): JSX.Element {

  const { profileData } = useAuth();

  const { data: categories } = useQuery({
    queryKey: ['showCategory'],
    queryFn: () => appointmentCategoryService.show({userId: profileData!.sub}),
    enabled: isOpen
  });

  const { handleSubmit: hookFormSubmit, register, formState: {errors}, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        category: `${defaultValues.appointmentType}-${defaultValues.appointmentPayment}`
      });
    }
  }, [defaultValues, reset]);

  const { mutateAsync: createAppointment, isPending: isCreationPending } = useMutation({
    mutationKey: ['createAppointment'],
    mutationFn: async (data: CreateAppointment ) => { return appointmentService.create(data); }
  });

  const { mutateAsync: updateAppointment, isPending: isUpdatePending } = useMutation({
    mutationKey: ['updateAppointment'],
    mutationFn: async (data: UpdateAppointment ) => { return appointmentService.update(data); }
  });

  const handleSubmit = hookFormSubmit(async (data) => {

    const date = data.date.split('-')
    const category = data.category.split('-');
    
    if (defaultValues) {
      const oldDate = defaultValues.date.split('-')

      const updateAppointmentData = {
        userId: profileData!.sub,
        appointmentDate: `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`,
        appointmentId: defaultValues.appointmentId,
        newAppointmentDate: `${date[2]}-${date[1]}-${date[0]}`,
        name: data.name,
        phoneNumber: data.phoneNumber, 
        startsAt: data.startAt,
        endsAt: data.endsAt,
        appointmentType: category[0],
        appointmentPayment: category[1],
      }
  
      await updateAppointment(updateAppointmentData)
        .then(() => {
          toast.success('Atendimento atualizado com sucesso!')
        })
        .catch(() => {
          toast.error('Não foi possível atualizar seu atendimento')
        });

    } else {

      const newAppointment = {
        userId: profileData!.sub,
        appointmentDate: `${date[2]}-${date[1]}-${date[0]}`,
        name: data.name,
        phoneNumber: data.phoneNumber, 
        startsAt: data.startAt,
        endsAt: data.endsAt,
        appointmentType: category[0],
        appointmentPayment: category[1]
      }
  
      await createAppointment(newAppointment)
        .then(() => {
          toast.success('Atendimento agendado com sucesso!')
        })
        .catch(() => {
          toast.error('Não foi possível agendar seu atendimento')
        });
    }

  });

  return (
    <div className={`h-full w-full bg-black fixed z-10 bg-opacity-75 left-0 top-0 ${isOpen ? 'block' : 'hidden'} ${isOpen ? 'animate-fadeIn' : ''} transition-all`}>
      <div className="flex sm:items-center sm:justify-center flex-col justify-end items-end h-full">
        <div className={`bg-white sm:w-2/5 h-4/5 p-4 w-full rounded-t-lg sm: rounded-lg ${isOpen ? 'sm:animate-fadeIn animate-fadeInUp' : ''}`}>
      
          <header className="flex justify-between pb-3 ">
            <h1 className="text-xl">Novo Atendimento</h1>
            <button onClick={() => {
              onRegister()
              reset()
              refetchAppointments()
            }}>
              <X size={28}/>
            </button>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-4 mt-4">
              <section>
                <Input
                  {...register('name')}
                  placeholder="Nome"
                  defaultValue={defaultValues ?  defaultValues.name : ''}
                  error={errors.name?.message}
                  />
              </section>
              <section>
                <Input
                  {...register('phoneNumber')}
                  placeholder="Telefone"
                  defaultValue={defaultValues ? defaultValues.phoneNumber : ''}
                  error={errors.phoneNumber?.message}
                  />
              </section>
              <section>
                <Input
                  {...register('date')}
                  id="date"
                  type="date"
                  placeholder="Data do atendimento"
                  error={errors.date?.message}
                  />
              </section>
              <section className="flex flex-col">
                <label className="px-3 text-gray-700">Horário</label>
                <div className="flex justify-between w-full gap-x-4">
                  <div className="w-full">
                    <Input 
                    {...register('startAt')}
                    type='time' 
                    placeholder="Incío"
                    defaultValue={defaultValues? defaultValues.startsAt : ''}
                    error={errors.startAt?.message}
                    />
                  </div>
                  <div className="w-full">
                    <Input 
                    {...register('endsAt')} 
                    type='time' 
                    placeholder="Fim" 
                    defaultValue={defaultValues? defaultValues.endsAt : ''}
                    error={errors.endsAt?.message}
                    />
                  </div>
                </div>
              </section>
              <section className="flex w-full gap-x-3 items-end">
                <div className="w-full">
                  <label className="px-3 text-gray-700">Categoria do atendimento</label>
                  <Select className='bg-white rounded-lg border border-gray-500 p-3 h-[52px] text-gray-800 peer focus:border-gray-800' 
                    {...register('category')}
                    error={errors.category?.message}
                    defaultValue={defaultValues ? `${defaultValues.appointmentType}-${defaultValues.appointmentPayment}` : undefined}
                    >
                      {categories && categories.map((record: ICategory) => 
                      <option key={record.appointmentTypeId} 
                        value={`${record.appointmentTypeName}-${record.appointmentTypePrice}`}
                      > {record.appointmentTypeName}
                      </option>
                      )}
                  </Select>
                </div>
              </section>
              <div className="flex w-full justify-end mt-5">
                <Button isPending={isCreationPending || isUpdatePending}>{defaultValues ? 'Atualizar' : 'Registrar'}</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}