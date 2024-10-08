import { httpClient } from "../httpClient";

export interface SignupParams {
  firstName: string;
  email: string;
  password: string;
}

interface SignupResponse { userId: string  }

export async function signup(params: SignupParams) {
  const { data } = await httpClient.post<SignupResponse>('/auth/signup', params);

  return data;
}