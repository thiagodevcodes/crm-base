import { User } from "@/types/user";
import { delay } from "@/utils/functions";
import axios from "axios";

export async function createUser(
  name: string,
  username: string,
  password: string,
  roles: string[]
): Promise<User> {
  await delay(700);

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/users`,
    { name, username, password, roles },
    { withCredentials: true }
  );

  return response.data;
}

export async function updateUser(
  id: string,
  name: string,
  username: string,
  roles: string[]
): Promise<User> {
  await delay(700);

  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
    { name, username, roles },
    { withCredentials: true }
  );

  return response.data;
}

export async function updatePassword(
  id: string,
  password: string
): Promise<User> {
  await delay(700);

  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/password/${id}`,
    { password },
    { withCredentials: true }
  );

  return response.data;
}

export async function getUsers(): Promise<User[]> {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    withCredentials: true,
  });

  return response.data;
}

export async function deleteUser(userId: string): Promise<void> {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
    withCredentials: true,
  });
}
