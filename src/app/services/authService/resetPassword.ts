import { httpClient } from "../httpClient";

export interface ResetPasswordParams {
  email: string;
  code: string;
  newPassword: string;
}

export async function resetPassword(params: ResetPasswordParams) {
  await httpClient.post('/auth/reset-password', params);
  return null;
}