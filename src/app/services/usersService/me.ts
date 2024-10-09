import { httpClient } from "../httpClient";

export interface MeResponse {
  email: string;
  email_verified: boolean;
  given_name: string;
  sub: string
}


export async function me() {
  const { data } = await httpClient.get<MeResponse>('/profile');

  return data;
}