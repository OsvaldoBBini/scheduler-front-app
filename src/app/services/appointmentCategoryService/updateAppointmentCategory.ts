import { httpClient } from "../httpClient";

export interface UpdateAppointmentCategory {
  userId: string;
  appointmentTypeId: string;
  appointmentTypeName: string;
  appointmentTypePrice: string;
}

export async function updateAppointmentCategory(params: UpdateAppointmentCategory) {
  await httpClient.put(`/appointments_type/${params.userId}?appointmentTypeId=${params.appointmentTypeId}`, {appointmentTypeName: params.appointmentTypeName, appointmentTypePrice: params.appointmentTypePrice});
  return null;
}