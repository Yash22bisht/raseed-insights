import { http, unwrap } from "./http";
import type { User } from "@/store/authStore";

export type AuthResponse = {
  user: User;
  accessToken: string;
  refreshToken?: string;
};

export async function loginRequest(email: string, password: string) {
  const { data } = await http.post("/auth/login", { email, password });
  return unwrap<AuthResponse>(data);
}

export async function registerRequest(payload: {
  name: string;
  email: string;
  password: string;
}) {
  const { data } = await http.post("/auth/register", payload);
  return unwrap<AuthResponse>(data);
}

export async function fetchProfile() {
  const { data } = await http.get("/user/profile");
  return unwrap<User>(data);
}

export async function updateProfile(patch: Partial<User>) {
  const { data } = await http.put("/user/profile", patch);
  return unwrap<User>(data);
}

export async function changePassword(payload: {
  currentPassword: string;
  newPassword: string;
}) {
  const { data } = await http.post("/user/change-password", payload);
  return unwrap<{ success: boolean }>(data);
}