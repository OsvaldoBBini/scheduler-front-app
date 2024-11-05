import { httpClient } from "../httpClient";

export interface RefreshParams {
  refreshToken: string;
}

interface RefreshResponse { accessToken: string, refreshToken: string  }

export async function refreshToken(params: RefreshParams) {
  const { data } = await httpClient.post<RefreshResponse>('/auth/refresh', params);

  return data;
}