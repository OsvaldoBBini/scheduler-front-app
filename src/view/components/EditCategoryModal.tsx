import { PencilSimple } from "@phosphor-icons/react";
import { Button } from "./Button";
import { useAuth } from "../../app/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { appointmentTypeService } from "../../app/services/appointmentTypeService";
import { Card } from "./Card";
import { ReactPortal } from "./ReactPortal";
import { CreateCategoryModal } from "./CreateCategoryModal";
import { useCallback, useState } from "react";
import { ModalContainer } from "./Modal";
import { Spinner } from "./Spinner";


interface ICreateCategoryModal {
  onEditCategory: () => void;
  isOpen: boolean;
}

export interface ICategory {
  PK: string,
  SK: string;
  appointmentTypeName: string;
  appointmentTypePrice: string;
}

export function EditCategoryModal({onEditCategory, isOpen}: ICreateCategoryModal) {

  const { profileData } = useAuth();

  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<ICategory | null>(null);

  const handleDefaultValues = ((record: ICategory) => {
    setDefaultValues(record);
  });

  const handleModalStatus = useCallback(() => {
    setModalStatus(prevState => !prevState);
  }, []);

  const { data: typesRecords, refetch: refetchCategories, isPending: isPendingCategories } = useQuery({
    queryKey: ['showCategory'],
    queryFn: () => appointmentTypeService.show({userId: profileData!.sub}),
    enabled: isOpen
  });

  return (
    <>
      <ModalContainer isOpen={isOpen} onModal={onEditCategory} title="Gerenciar Categorias">
            <section className="mt-4 h-full">
                <span>Tipos já cadastrados:</span>
                {isPendingCategories && 
                <div className="flex h-full w-full justify-center items-center">
                  <Spinner className="h-12 w-12"/>
                </div>}
                {!isPendingCategories && 
                  <ul className="flex flex-col gap-y-3 mt-4 p-3 sm:max-h-56 max-h-72 overflow-auto
                  [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:bg-gray-100
                  [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                  [&::-webkit-scrollbar-thumb]:rounded-full
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
                  ">
                    {typesRecords && typesRecords.Items.map((record: ICategory) => 
                      <li key={record.SK}>
                        <Card>
                          <>
                            <div className="flex flex-col">
                              <span>{record.appointmentTypeName}</span>
                              <span className="ml-3 text-green-700">R$ {record.appointmentTypePrice}</span>
                            </div>
                            <Button onClick={() => {
                              handleModalStatus();
                              handleDefaultValues(record)
                            }}>
                              <PencilSimple size={25}/>
                            </Button>
                          </>
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