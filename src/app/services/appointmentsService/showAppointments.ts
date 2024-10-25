import { httpClient } from "../httpClient";

export interface ShowAppointment {
  userId: string;
  date: string;
}

interface IInputAppointment {
  PK: string;
  SK: string;
  appointmentPayment: string;
  appointmentType: string;
  confirmed: boolean;
  startsAt: string;
  endsAt: string;
  name: string;
  phoneNumber: string;
}

export interface IAppointment {
  appointmentId: string;
  appointmentPayment: string;
  appointmentType: string;
  confirmed: boolean;
  startsAt: string;
  endsAt: string;
  name: string;
  phoneNumber: string;
}

const mapper = (data: IInputAppointment[]): IAppointment[] => data.map((appointment: IInputAppointment): IAppointment => ({
  appointmentId: appointment.SK.split('#')[1],
  appointmentPayment: appointment.appointmentPayment,
  appointmentType: appointment.appointmentType,
  confirmed: appointment.confirmed,
  startsAt: appointment.startsAt,
  endsAt: appointment.endsAt,
  name: appointment.name,
  phoneNumber: appointment.phoneNumber,
}))

export async function showAppointment(params: ShowAppointment) {
  const { data } = await httpClient.get(`/appointments/${params.userId}/${params.date}`);

  return mapper(data.Items);
}