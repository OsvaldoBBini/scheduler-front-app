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
  date: string;
}

const mapper = (data: IInputAppointment[]): IAppointment[] => data.map((appointment: IInputAppointment): IAppointment => {

  const date = appointment.PK.split('DATE#')[1].split('USER#')[0].split('-')

  return {
    appointmentId: appointment.SK.split('#')[1],
    date: `${date[2]}-${date[1]}-${date[0]}`,
    appointmentPayment: appointment.appointmentPayment,
    appointmentType: appointment.appointmentType,
    confirmed: appointment.confirmed,
    startsAt: appointment.startsAt,
    endsAt: appointment.endsAt,
    name: appointment.name,
    phoneNumber: appointment.phoneNumber,
  }
})

export async function showAppointment(params: ShowAppointment) {
  const { data } = await httpClient.get(`/appointments/${params.userId}/${params.date}`);
  const items = mapper(data.Items).sort((a, b) => {
    const [hoursA, minutesA] = a.startsAt.split(":").map(Number);
    const [hoursB, minutesB] = b.startsAt.split(":").map(Number);
    
    const totalMinutesA = hoursA * 60 + minutesA;
    const totalMinutesB = hoursB * 60 + minutesB;

    return totalMinutesA - totalMinutesB;
  })
  return items;
}