import axios from "axios";
import { cookies } from "next/headers";

export async function checkAuth() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) return false; // não logado

  try {
    // chamada ao backend para validar token
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: { Cookie: `token=${token}` }, // envia cookie HTTP-only
      withCredentials: true,
    });

    console.log(res);

    return res.status === 200;
  } catch {
    return false;
  }
}
