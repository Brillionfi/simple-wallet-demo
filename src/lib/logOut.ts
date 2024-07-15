import { B2B_API_URL } from "@/utils/constants";

export async function logOut(jwt: string) {
  document.cookie = "session-wallet=";
  await fetch(`${B2B_API_URL}/users/logout`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  window.location.href = "http://localhost:3000";
}
