import { v4 as uuidv4 } from "uuid";

export async function createOrganization(token: string) {
  const name = document.getElementById("name") as HTMLInputElement;
  const response = await fetch(
    `https://2mrss608q8.execute-api.eu-west-1.amazonaws.com/majid-allianceblock/organizations`,
    {
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
    }
  );
  console.log(response);
  const jwt = response.headers.get("Jwt"); // Response headers is empty...
  console.log(jwt);
  const answer = await response.json();
  console.log(answer);
  /* Answer type is:
    {
      organization: {
        id: "a5ef230b-ca64-49c9-9096-83ada9201b90"
        name: "Brillionxx"
        owner: "adrien.coffre@brillion.finance"
        status: "ACTIVE"
      }
    }
     */
  if (answer.organization?.name === name && answer.status === "ACTIVE") {
    // good answer, redirect
  } else if (
    answer.message?.includes("This user already have an organization")
  ) {
    window.location.href = "/";
    // user already has org, show error
  } else {
    // show unknown error
  }
}
