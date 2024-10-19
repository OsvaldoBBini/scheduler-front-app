import { httpClient } from "../httpClient";

export interface UpdateAppointmentType {
  userId: string;
  appointmentTypeId: string;
  appointmentTypeName: string;
  appointmentTypePrice: string;
}

export async function updateAppointmentType(params: UpdateAppointmentType) {
  await httpClient.put(`/appointments_type/${params.userId}?appointmentTypeId=${params.appointmentTypeId}`, {appointmentTypeName: params.appointmentTypeName, appointmentTypePrice: params.appointmentTypePrice});
  return null;
}