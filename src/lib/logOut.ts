import { BASE_URL } from "@/utils/constants";

export async function logOut(jwt: string) {
  document.cookie = "session-wallet=";
  await fetch(`${BASE_URL}/users/logout`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  window.location.href = BASE_URL;
}
