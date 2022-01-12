import { server } from "config";

export async function fetchValidate(token) {
  try {
    const res = await fetch(`${server}/api/auth/validateToken/${token}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    console.log({ res });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log({ error });
  }
}
