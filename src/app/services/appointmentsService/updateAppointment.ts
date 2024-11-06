import { httpClient } from "../httpClient";

export interface UpdateAppointment {
  userId: string;
  newAppointmentDate: string;
  appointmentDate: string;
  appointmentId: string;
  name: string;
  contact: string;
  startsAt: string;
  endsAt: string;
  appointmentType: string;
  appointmentPayment: string;
}

export async function updateAppointment(params: UpdateAppointment) {
  await httpClient.put(`/appointments/${params.userId}/${params.appointmentDate}`, {...params});
  return null;
}