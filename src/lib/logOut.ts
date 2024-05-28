import { BASE_URL } from "@/utils/constants";

export async function logOut(jwt: string) {
  document.cookie = "session=";
  await fetch(`${BASE_URL}/users/logout`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  window.location.href = "http://localhost:3000";
}
