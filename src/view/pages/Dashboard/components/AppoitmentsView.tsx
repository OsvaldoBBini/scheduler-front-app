import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../../app/hooks/useAuth";
import { useDateFilters } from "../../../../app/hooks/useDateFilters"
import { appointmentService } from "../../../../app/services/appointmentsService";
import { useEffect } from "react";
import { IAppointment } from "../../../../app/services/appointmentsService/showAppointments";
import { Card } from "../../../components/Card";

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

          <Card key={appointment.appointmentId} className={'w-full'}>
            <span>{appointment.name}</span>
          </Card>  
        )}
    </div>
  )
}