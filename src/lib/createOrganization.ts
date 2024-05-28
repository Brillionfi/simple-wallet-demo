import { BASE_URL } from "@/utils/constants";
import { v4 as uuidv4 } from "uuid";

export async function createOrganization(token: string) {
  const name = document.getElementById("name") as HTMLInputElement;
  const response = await fetch(`${BASE_URL}/organizations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Idempotency-Key": uuidv4(),
    },
    body: JSON.stringify({
      name: name.value,
      monthlyBilling: true,
      active: true,
    }),
  });
  const jwt = response.headers.get("Jwt");
  console.log(jwt);
  const answer = await response.json();
  console.log(answer);
  if (answer.organization?.name === name && answer.status === "ACTIVE") {
    window.location.href = "http://localhost:3000";
  } else if (
    answer.message?.includes("This user already have an organization")
  ) {
    // user already has org, show error
  } else {
    // show unknown error
  }
}
