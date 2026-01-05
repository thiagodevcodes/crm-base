import { CreateUserResult, User } from "@/types/user";
import { delay } from "@/utils/functions";
import axios, { AxiosError } from "axios";

export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<CreateUserResult> {
  try {
    await delay(700);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      { name, email, password },
      { withCredentials: true }
    );

    return { success: true, response: response };
  } catch (err) {
    const error = err as AxiosError;
    return { success: false, response: error };
  }
}

export async function updateUser(
  name: string,
  email: string,
  password: string
): Promise<CreateUserResult> {
  try {
    await delay(700);

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      { name, email, password },
      { withCredentials: true }
    );

    return { success: true, response: response };
  } catch (err) {
    const error = err as AxiosError;
    return { success: false, response: error };
  }
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
