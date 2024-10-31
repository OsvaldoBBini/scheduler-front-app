import { httpClient } from "../httpClient";

export interface DeleteAppointment {
  userId: string;
  appointmentId: string;
  appointmentDate: string;
}

export async function deleteAppointment(params: DeleteAppointment) {
  await httpClient.delete(`/appointments`, { data: {...params} });
  return null;
}