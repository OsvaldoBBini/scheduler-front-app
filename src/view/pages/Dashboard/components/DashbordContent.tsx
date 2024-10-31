import { useCallback, useEffect, useState } from "react";
import { AppointmentView } from "./AppoitmentsView";
import { Plus } from "@phosphor-icons/react";
import { ReactPortal } from "../../../components/ReactPortal";
import { CreateCategoryModal } from "../../../components/CreateCategoryModal";
import { EditCategoryModal } from "../../../components/EditCategoryModal";
import { RegisterForm } from "./RegisterForm";
import { Button } from "../../../components/Button";
import { useAuth } from "../../../../app/hooks/useAuth";
import { useDateFilters } from "../../../../app/hooks/useDateFilters";
import { appointmentService } from "../../../../app/services/appointmentsService";
import { useQuery } from "@tanstack/react-query";

export function DashboardContent() {
  
  const { profileData } = useAuth();
  const { searchDate } = useDateFilters();
  
  const [createNewCategory, setCreateNewCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [register, setRegister] = useState(false);

  const handleNewCategory = useCallback(() => setCreateNewCategory(prevState => !prevState), []);
  const handleEditCategory = useCallback(() => setEditCategory(prevState => !prevState), []);
  const handleRegister = useCallback(() => setRegister(prevState => !prevState), []);

  const { data: appointments, isPending: isPendingAppointments, isFetching: isFetchingAppointments, refetch: refetchAppointments } = useQuery({
    queryKey: ['showAppointments'],
    queryFn: () => appointmentService.show({userId: profileData!.sub, date: searchDate}),
  });

  useEffect(() => {
    if (searchDate) {
      refetchAppointments()
    }
  }, [refetchAppointments, searchDate]);
  
  return(
    <>

      <section className="w-full mt-4 flex justify-center">
        <div className="flex w-11/12 sm:w-2/5 justify-end gap-x-2">
          <Button className="shadow-md py-1 px-2 rounded-lg hover:bg-white text-black bg-slate-50" onClick={handleNewCategory}>Nova Categoria</Button>
          <Button className="shadow-md py-1 px-2 rounded-lg hover:bg-white text-black bg-slate-50" onClick={handleEditCategory}>Editar Categoria</Button>
          <Button className="p-3 border-green-700 border-[1px] bg-green-100 text-green-700 hover:bg-green-50 shadow-md" onClick={handleRegister}>
            <Plus size={25} />
          </Button>
        </div>
      </section>

      <section className="flex justify-center">
        <AppointmentView appointments={appointments} isPendingAppointments={isPendingAppointments} isFetchingAppointments={isFetchingAppointments} refetchAppointments={refetchAppointments}/>
      </section>

      <ReactPortal containerID="create-category" children={<CreateCategoryModal isOpen={createNewCategory} onNewCategory={handleNewCategory}/>}/>
      
      <ReactPortal containerID="edit-category" children={<EditCategoryModal isOpen={editCategory} onEditCategory={handleEditCategory}/>}/>
      
      <ReactPortal containerID="register" children={<RegisterForm isOpen={register} onRegister={handleRegister} refetchAppointments={refetchAppointments}/>}/>
    </>
  )
}