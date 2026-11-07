import { api } from "../api/client";
import { User } from "../types";
export async function updateProfile(
  id: number,
  data: Pick<User, "name" | "phone">,
): Promise<User> {
  const res = await api.patch<User & { password?: string }>(`/users/${id}`, {
    name: data.name,
    phone: data.phone,
  });
  const { password: _password, ...user } = res.data;
  return user;
}
