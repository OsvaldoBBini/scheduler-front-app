import { httpClient } from "../httpClient";

export interface ForgotPasswordParams {
  email: string;
}

export async function forgotPassword(params: ForgotPasswordParams) {
  await httpClient.post('/auth/forgot', params);
  return null;
}