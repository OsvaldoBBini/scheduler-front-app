import { httpClient } from "../httpClient";

interface MeResponse {
  Name: string;
  Value: string
}


export async function me() {
  const { data } = await httpClient.get<MeResponse[]>('/profile');

  return data;
}