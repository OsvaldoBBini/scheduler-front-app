import { httpClient } from "../httpClient";

export interface DeleteAppointmentType {
  userId: string;
  appointmentTypeId: string;
}

export async function deleteAppointmentCategory(params: DeleteAppointmentType) {
  await httpClient.delete(`/appointments_type/${params.userId}`, { data: {appointmentTypeId: params.appointmentTypeId} });
  return null;
}