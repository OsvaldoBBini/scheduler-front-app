import { httpClient } from "../httpClient";

export interface CreateAppointment {
  userId: string;
  appointmentDate: string;
  name: string;
  contact: string;
  startsAt: string;
  endsAt: string;
  appointmentType: string;
  appointmentPayment: string;
}

export async function createAppointment(params: CreateAppointment) {
  await httpClient.post(`/appointments`, {...params});
  return null;
}