import { httpClient } from "../httpClient";

export interface ConfirmationAccountParams {
  email: string;
  confirmationCode: string;
}

type ConfirmationAccountResponse = unknown

export async function confirmAccount(params: ConfirmationAccountParams) {
  await httpClient.post<ConfirmationAccountResponse>('/auth/confirmation', params);
  return null;
}