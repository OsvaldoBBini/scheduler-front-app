import { PencilSimple, Trash } from "@phosphor-icons/react";
import { Button } from "./Button";
import { useAuth } from "../../app/hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { appointmentCategoryService } from "../../app/services/appointmentCategoryService";
import { Card } from "./Card";
import { ReactPortal } from "./ReactPortal";
import { CreateCategoryModal } from "./CreateCategoryModal";
import { useCallback, useState } from "react";
import { ModalContainer } from "./Modal";
import { Spinner } from "./Spinner";
import { ICategory } from "../../app/services/appointmentCategoryService/showAppointmentCategory";
import { DeleteComponent } from "./DeleteComponent";
import { DeleteAppointmentType } from "../../app/services/appointmentCategoryService/deleteAppointmentCategory";


interface ICreateCategoryModal {
  onEditCategory: () => void;
  isOpen: boolean;
}

interface IShouldDelete {
  appointmentTypeId: string;
  userId: string;
}

export function EditCategoryModal({onEditCategory, isOpen}: ICreateCategoryModal) {

  const { profileData } = useAuth();

  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [shouldDelete, setShouldDelete] = useState<IShouldDelete>({appointmentTypeId: '', userId: ''});
  const [defaultValues, setDefaultValues] = useState<ICategory | undefined>(undefined);

  const handleShouldDelete = (param: IShouldDelete) => {
    setShouldDelete({...param});
  };

  const handleCancelDelete = () => setShouldDelete({userId: '', appointmentTypeId: ''});

  const handleDefaultValues = ((record: ICategory) => {
    setDefaultValues(record);
  });

  const handleModalStatus = useCallback(() => {
    setModalStatus(prevState => !prevState);
  }, []);

  const { data: typesRecords, refetch: refetchCategories, isFetching: isFetchingCategories, isPending: isPendingCategories } = useQuery({
    queryKey: ['showCategory'],
    queryFn: () => appointmentCategoryService.show({userId: profileData!.sub}),
    enabled: isOpen
  });

  const { mutateAsync: deleteAppointment, isPending: isDeletePending } = useMutation({
    mutationKey: ['deleteAppointmentCategory'],
    mutationFn: async (data: DeleteAppointmentType ) => { return appointmentCategoryService.delete(data); }
  });

  const handleDelete = async () => {
    await deleteAppointment(shouldDelete);
    refetchCategories();
  }

  return (
    <>
      <ModalContainer isOpen={isOpen} onModal={onEditCategory} title="Gerenciar Categorias">
            <section className="mt-4 h-full">
                <span>Tipos já cadastrados:</span>
                {isPendingCategories || isFetchingCategories && 
                <div className="flex h-full w-full justify-center items-center">
                  <Spinner className="h-12 w-12"/>
                </div>}
                {!isPendingCategories && !isFetchingCategories && 
                  <ul className="flex flex-col gap-y-3 mt-4 p-3 sm:max-h-56 max-h-[75%] overflow-auto
                  [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:bg-gray-100
                  [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                  [&::-webkit-scrollbar-thumb]:rounded-full
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
                  ">
                    {typesRecords && typesRecords.map((record: ICategory) => 
                      <li key={record.appointmentTypeId}>
                        <Card>
                            <div className="flex flex-col">
                              <span>{record.appointmentTypeName}</span>
                              <span className="ml-3 text-green-700">R$ {record.appointmentTypePrice}</span>
                            </div>
                             <div className="flex gap-x-1">
                              {shouldDelete.appointmentTypeId !== record.appointmentTypeId &&
                                <>
                                  <Button onClick={() => {
                                    handleModalStatus();
                                    handleDefaultValues(record)
                                  }} className="p-3">
                                    <PencilSimple size={25}/>
                                  </Button>
                                  <Button className="p-2.5 border-red-700 border-[1px] bg-red-100 text-red-700 hover:bg-red-50" onClick={() => handleShouldDelete({appointmentTypeId: record.appointmentTypeId, userId: profileData!.sub})}>
                                    <Trash size={25}/>
                                  </Button>
                                </>
                              }
                              {
                                shouldDelete.appointmentTypeId === record.appointmentTypeId && 
                                <DeleteComponent onCancelDelete={handleCancelDelete} onDelete={handleDelete} isPending={isDeletePending}/>
                              }
                            </div>
                        </Card>
                      </li>
                    )}
                  </ul>
                }
            </section>
      </ModalContainer>

      <ReactPortal containerID="modal" children={<CreateCategoryModal isOpen={modalStatus} onNewCategory={handleModalStatus} defaultValues={defaultValues} refetchCategories={refetchCategories}/>}/>
    </>
      
  )
}