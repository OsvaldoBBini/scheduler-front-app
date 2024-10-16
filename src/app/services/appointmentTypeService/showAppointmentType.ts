import { httpClient } from "../httpClient";

export interface ShowAppointmentType {
  userId: string;
}

export async function showAppointmentType(params: ShowAppointmentType) {
  const { data } = await httpClient.get(`/appointments_type/${params.userId}`);
  return data;
}