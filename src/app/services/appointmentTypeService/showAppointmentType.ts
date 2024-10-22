import { httpClient } from "../httpClient";

export interface ShowAppointmentType {
  userId: string;
}

interface IInputCategorie {
  PK: string;
  SK: string;
  appointmentTypeName: string;
  appointmentTypePrice: string;
}

export interface ICategorie {
  userId: string;
  appointmentTypeId: string;
  appointmentTypeName: string;
  appointmentTypePrice: string;
}

const mapper = (data: IInputCategorie[]): ICategorie[] => data.map((categorie: IInputCategorie): ICategorie => ({
  userId: categorie.PK.split('#')[1],
  appointmentTypeId: categorie.SK.split('#')[1],
  appointmentTypeName: categorie.appointmentTypeName,
  appointmentTypePrice: categorie.appointmentTypePrice
}))

export async function showAppointmentType(params: ShowAppointmentType) {
  const { data } = await httpClient.get(`/appointments_type/${params.userId}`);

  return mapper(data.Items);
}