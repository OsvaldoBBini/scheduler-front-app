import { httpClient } from "../httpClient";

export interface CreateAppointmentType {
  userId: string;
  appointmentTypeName: string;
  appointmentTypePrice: string;
}

export async function createAppointmentType(params: CreateAppointmentType) {
  await httpClient.post(`/appointments_type/${params.userId}`, {appointmentTypeName: params.appointmentTypeName, appointmentTypePrice: params.appointmentTypePrice});
  return null;
}