import { User } from "@/types/user";
import { delay } from "@/utils/functions";
import axios from "axios";

export async function signIn(email: string, password: string): Promise<void> {
  await delay(700);

  await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/sign_in`,
    { username: email, password },
    { withCredentials: true }
  );

  return;
}

export async function signOut(): Promise<void> {
  await delay(700);

  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign_out`, null, {
    withCredentials: true,
  });
}

export async function getMe(): Promise<User> {
  await delay(700);

  const response = await axios.get<User>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
    { withCredentials: true }
  );

  return response.data;
}
