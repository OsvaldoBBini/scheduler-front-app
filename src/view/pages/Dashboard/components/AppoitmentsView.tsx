import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../../app/hooks/useAuth";
import { useDateFilters } from "../../../../app/hooks/useDateFilters"
import { appointmentService } from "../../../../app/services/appointmentsService";
import { useEffect } from "react";
import { IAppointment } from "../../../../app/services/appointmentsService/showAppointments";
import { Card } from "../../../components/Card";
import { Button } from "../../../components/Button";
import { WhatsappLogo } from "@phosphor-icons/react";

export function AppointmentView() {

  const { profileData } = useAuth();
  const { searchDate } = useDateFilters();


  const { data: appointments, isPending: isPendingCategories, refetch: refetchAppointments } = useQuery({
    queryKey: ['showAppointment'],
    queryFn: () => appointmentService.show({userId: profileData!.sub, date: searchDate}),
  });

  useEffect(() => {
    if (searchDate) {
      refetchAppointments()
    }
  }, [refetchAppointments, searchDate]);

  console.log({searchDate, appointments, isPendingCategories});

  return(
    <div className="flex flex-col p-2 w-11/12 md:w-2/5 items-center mt-4">
        {appointments?.map((appointment: IAppointment) => 

          <Card key={appointment.appointmentId} className={'w-full flex flex-col items-start gap-y-2'}>
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col">
                <small>Cliente:</small>
                <span className="ml-3">{appointment.name}</span>
              </div>
              <div>
                <a className="bg-green-200 p-2 rounded-2xl flex items-center gap-x-1" href={`https://wa.me/${appointment.phoneNumber}`} target="_blank">
                  <WhatsappLogo size={20} />
                  {appointment.phoneNumber}
                </a>
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex flex-col">
                <small>Categoria:</small>
                <span className="ml-3">{appointment.appointmentType}</span>
              </div>
              <div className="flex gap-x-3">
                <div className="flex flex-col">
                  <small>Início:</small>
                  <span className="ml-3">{appointment.startsAt}</span>
                </div>
                <div className="flex flex-col">
                  <small>Fim:</small>
                  <span className="ml-3">{appointment.endsAt}</span>
                </div>
              </div>
            </div>
            <footer className="w-full border-t-[1px] border-gray-200 p-1">
              <div className="flex items-center justify-end">
                <Button>Confirmar</Button>
                <Button>Editar</Button>
                <Button>Excluir</Button>
              </div>
            </footer>
          </Card>  
        )}
    </div>
  )
}