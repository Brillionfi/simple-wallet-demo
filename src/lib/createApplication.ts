import { BASE_URL } from "@/utils/constants";
import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";

export async function createApp(
  token: string,
  setLastAppName: Dispatch<SetStateAction<string>>
) {
  const nameInput = document.getElementById("app") as HTMLInputElement;
  const pKeyInput = document.getElementById("pkey") as HTMLInputElement;
  const appName = nameInput.value;
  const pKey = pKeyInput.value;
  const response = await fetch(`${BASE_URL}/organizations/apps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Idempotency-Key": uuidv4(),
    },
    body: JSON.stringify({
      name: appName,
      publicKey: pKey,
    }),
  }).then((res) => res.json());
  if (response.name) {
    setLastAppName(appName);
    nameInput.value = "";
    pKeyInput.value = "";
  }
}
