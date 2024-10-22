import { httpClient } from "../httpClient";

export interface CreateAppointmentCategory {
  userId: string;
  appointmentTypeName: string;
  appointmentTypePrice: string;
}

export async function CreateAppointmentCategory(params: CreateAppointmentCategory) {
  await httpClient.post(`/appointments_type/${params.userId}`, {appointmentTypeName: params.appointmentTypeName, appointmentTypePrice: params.appointmentTypePrice});
  return null;
}