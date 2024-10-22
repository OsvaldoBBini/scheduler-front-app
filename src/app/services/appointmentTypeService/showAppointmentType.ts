import { httpClient } from "../httpClient";

export interface ShowAppointmentType {
  userId: string;
}

interface IInputCategory {
  PK: string;
  SK: string;
  appointmentTypeName: string;
  appointmentTypePrice: string;
}

export interface ICategory {
  userId: string;
  appointmentTypeId: string;
  appointmentTypeName: string;
  appointmentTypePrice: string;
}

const mapper = (data: IInputCategory[]): ICategory[] => data.map((categorie: IInputCategory): ICategory => ({
  userId: categorie.PK.split('#')[1],
  appointmentTypeId: categorie.SK.split('#')[1],
  appointmentTypeName: categorie.appointmentTypeName,
  appointmentTypePrice: categorie.appointmentTypePrice
}))

export async function showAppointmentType(params: ShowAppointmentType) {
  const { data } = await httpClient.get(`/appointments_type/${params.userId}`);

  return mapper(data.Items);
}