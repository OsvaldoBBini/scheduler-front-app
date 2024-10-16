 import { X } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { Input } from "./Input";
import { Button } from "./Button";
import { useAuth } from "../../app/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { appointmentTypeService } from "../../app/services/appointmentTypeService";
import { CreateAppointmentType } from "../../app/services/appointmentTypeService/createAppointmentType";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const schema = z.object({
  appointmentTypeName: z.string().min(1, 'Informe um tipo válido'),
  appointmentTypePrice: z.string().regex(/^\d+(\.\d+)?/, 'Informe um valor válido')
})

type FormData = z.infer<typeof schema>

export function CreateTypeModal() {

  const { profileData } = useAuth();

  const { handleSubmit: hookFormSubmit, register, formState: {errors} } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isPending: isCreationPending } = useMutation({
    mutationKey: ['createType'],
    mutationFn: async (data: CreateAppointmentType ) => { return appointmentTypeService.create(data); }
  });

  // const { data: typesRecords, isError: isErrorTypes, isPending: isPendingTypes } = useQuery({
  //   queryKey: ['showType'],
  //   queryFn: () => profileData && appointmentTypeService.show({userId: profileData.sub}),
  //   enabled: true,
  // });

  // console.log(typesRecords);

  const handleSubmit = hookFormSubmit(async (data) => {;
    await mutateAsync({...data, userId: profileData!.sub})
      .then(() => toast.success('Tipo cadastrado com sucesso!!'))
      .catch(() => {
        toast.error('Não foi possivel cadastrar seu novo tipo!')}
      );
  });

  return (
    <motion.div className="h-full w-full bg-black fixed z-10 bg-opacity-75">
      <div className="flex items-center justify-center w-full h-full">
        <div className="bg-white w-4/5 h-2/5 rounded-lg p-3">
          <header className="flex justify-between">
            <h1 className="text-xl">Gerenciar Tipos</h1>
            <button>
              <X size={28}/>
            </button>
          </header>

          <section className="flex flex-col h-full justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
              <Input {...register('appointmentTypeName')} name="appointmentTypeName" placeholder="Nome do serviço"
              error={errors.appointmentTypeName?.message}/>
              <Input {...register('appointmentTypePrice')} name="appointmentTypePrice" placeholder="Preço"
              error={errors.appointmentTypePrice?.message}/>
              <Button type="submit" isPending={isCreationPending} disabled={isCreationPending}>Cadastrar</Button>
            </form>
          </section>

          {/* <section className="mt-4">
              <span>Tipos já cadastrados:</span>
              <ul className="flex flex-col gap-y-3 mt-4 p-3 max-h-72 overflow-auto
              [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-gray-100
              [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-300
              [&::-webkit-scrollbar-thumb]:rounded-full
            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
              ">
                {typesRecords && typesRecords.Items.map((record: any) => 
                  <li key={record.SK}>
                    <Card>
                      <>
                        <div>
                          <span>{record.appointmentTypeName}</span>
                          <span className="ml-3 text-green-700">R$ {record.appointmentTypePrice}</span>
                        </div>
                        <Button>
                          <PencilSimple size={20}/>
                        </Button>
                      </>
                    </Card>
                  </li>
                )}
              </ul>
          </section> */}

        </div>
      </div>
    </motion.div>
  )
}