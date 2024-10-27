import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../../app/hooks/useAuth";
import { useDateFilters } from "../../../../app/hooks/useDateFilters"
import { appointmentService } from "../../../../app/services/appointmentsService";
import { useCallback, useEffect, useState } from "react";
import { IAppointment } from "../../../../app/services/appointmentsService/showAppointments";
import { Card } from "../../../components/Card";
import { Button } from "../../../components/Button";
import { PencilSimple, Trash, WhatsappLogo } from "@phosphor-icons/react";
import { Spinner } from "../../../components/Spinner";
import { ReactPortal } from "../../../components/ReactPortal";
import { RegisterForm } from "./RegisterForm";

export function AppointmentView() {

  const { profileData } = useAuth();
  const { searchDate } = useDateFilters();

  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<IAppointment | undefined>(undefined);

  const handleModalStatus = useCallback(() => {
    setModalStatus(prevState => !prevState);
  }, []);

  const { data: appointments, isPending: isPendingCategories, isFetching: isFetchingCategories, refetch: refetchAppointments } = useQuery({
    queryKey: ['showAppointment'],
    queryFn: () => appointmentService.show({userId: profileData!.sub, date: searchDate}),
  });

  const handleDefaultValues = ((record: IAppointment) => {
    setDefaultValues(record);
    handleModalStatus();
  });

  useEffect(() => {
    if (searchDate) {
      refetchAppointments()
    }
  }, [refetchAppointments, searchDate]);

  return(
    <>
    
    <div className="flex flex-col w-11/12 md:w-2/5 items-center mt-4">
      { isPendingCategories || isFetchingCategories && 
        <div className="h-96 flex justify-center items-center">
          <Spinner/>
        </div>
      }
      { !isPendingCategories && !isFetchingCategories && 
      
    <ul className='flex w-full flex-col gap-y-3 mt-4 p-3'>
        {appointments?.map((appointment: IAppointment) => 
          <li key={appointment.appointmentId} className="w-full">
              <Card  className={'w-full flex flex-col items-start gap-y-2 mb-4'}>
                <div className="w-full flex justify-between items-center">
                  <div className="flex flex-col">
                    <small>Cliente:</small>
                    <span className="ml-3">{appointment.name}</span>
                  </div>
                </div>
                <div>
                  <a className="bg-green-200 p-2 rounded-2xl flex items-center gap-x-1" href={`https://wa.me/${appointment.phoneNumber}`} target="_blank">
                    <WhatsappLogo size={20} />
                    {appointment.phoneNumber}
                  </a>
                </div>
                <div className="flex w-full gap-x-4 flex-wrap">
                  <div className="flex flex-col">
                    <small>Categoria:</small>
                    <span className="ml-3">{appointment.appointmentType}</span>
                  </div>
                    <div className="flex flex-col">
                      <small>Início:</small>
                      <span className="ml-3">{appointment.startsAt}</span>
                    </div>
                    <div className="flex flex-col">
                      <small>Fim:</small>
                      <span className="ml-3">{appointment.endsAt}</span>
                    </div>
                </div>
                <footer className="w-full border-t-[1px] border-gray-300 pt-2">
                  <div className="flex items-center justify-end gap-x-2">
                    <Button className="text-black border-green-400 bg-green-200 hover:bg-green-100 p-2.5 border-[1px]">Confirmar</Button>
                    <Button onClick={() => handleDefaultValues(appointment)} className="p-3">
                      <PencilSimple size={25}/>
                    </Button>
                    <Button className="p-2.5 border-red-700 border-[1px] bg-red-100 text-red-700 hover:bg-red-50" onClick={() => {}}>
                      <Trash size={25}/>
                    </Button>
                  </div>
                </footer>
              </Card>  
          </li>
          )}
      </ul>
      }
    </div>

    <ReactPortal containerID="edit-register" children={<RegisterForm isOpen={modalStatus} onRegister={handleModalStatus} defaultValues={defaultValues}
    refetchAppointments={refetchAppointments}/>}/>
    </>
  )
}