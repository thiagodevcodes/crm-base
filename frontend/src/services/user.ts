import { CreateUserResult } from "@/types/user";
import { delay } from "@/utils/functions";
import axios, { AxiosError, AxiosResponse } from "axios";

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