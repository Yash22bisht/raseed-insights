import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/authStore";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT
http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token && config.headers) {
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh-token flow
let refreshing: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const { refreshToken, setTokens, logout } = useAuthStore.getState();
  if (!refreshToken) return null;
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
      refreshToken,
    });
    const newAccess: string = data?.accessToken ?? data?.data?.accessToken;
    const newRefresh: string =
      data?.refreshToken ?? data?.data?.refreshToken ?? refreshToken;
    if (!newAccess) throw new Error("No access token returned");
    setTokens(newAccess, newRefresh);
    return newAccess;
  } catch (err) {
    logout();
    return null;
  }
}

http.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (
      error.response?.status === 401 &&
      !original?._retry &&
      !original?.url?.includes("/auth/")
    ) {
      original._retry = true;
      refreshing = refreshing ?? refreshAccessToken();
      const token = await refreshing;
      refreshing = null;
      if (token) {
        original.headers = (original.headers ?? {}) as any;
        (original.headers as any).Authorization = `Bearer ${token}`;
        return http(original);
      }
    }
    return Promise.reject(error);
  },
);

// Helper to unwrap { success, data } envelopes if backend uses them
export function unwrap<T>(payload: any): T {
  if (payload && typeof payload === "object" && "data" in payload && "success" in payload) {
    return payload.data as T;
  }
  return payload as T;
}