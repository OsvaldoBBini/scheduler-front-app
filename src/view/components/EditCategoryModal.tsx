import { PencilSimple, X } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { Button } from "./Button";
import { useAuth } from "../../app/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { appointmentTypeService } from "../../app/services/appointmentTypeService";
import { hide, show } from "../../app/utils/style";
import { Card } from "./Card";
import { ReactPortal } from "./ReactPortal";
import { CreateCategoryModal } from "./CreateCategoryModal";
import { useCallback, useState } from "react";


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

  const { data: typesRecords, refetch: refetchCategories } = useQuery({
    queryKey: ['showCategory'],
    queryFn: () => appointmentTypeService.show({userId: profileData!.sub}),
    enabled: isOpen
  });

  return (
    <motion.div className={`h-full w-full bg-black fixed left-0 top-0 z-10 bg-opacity-75`} animate={isOpen ? show : hide}>
      <div className="flex items-center justify-center w-full h-full">
        <div className="bg-white md:w-1/3 w-4/5 sm:h-2/4 h-3/5 rounded-lg p-3">
          <header className="flex justify-between">
            <h1 className="text-xl">Gerenciar Categoria</h1>
            <button onClick={onEditCategory}>
              <X size={28}/>
            </button>
          </header>

          

          <section className="mt-4">
              <span>Tipos já cadastrados:</span>
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
          </section>

        </div>
      </div>

      <ReactPortal containerID="modal" children={<CreateCategoryModal isOpen={modalStatus} onNewCategory={handleModalStatus} defaultValues={defaultValues} refetchCategories={refetchCategories}/>}/>
      
    </motion.div>
  )
}