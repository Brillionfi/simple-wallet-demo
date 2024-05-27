"use client";

import { Button } from "@/components/ui/button";
import { jwtDecode } from "@/lib/jwt-decode";
import { LoginTypes } from "@/lib/url";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";

async function createOrganization(token: string) {
  const name = document.getElementById("name") as HTMLInputElement;
  const response = await fetch(
    `api/create-org?name=${name.value}&token=${token}`
  ).then((res) => res.json());
  /* const response = await fetch(
    "https://2mrss608q8.execute-api.eu-west-1.amazonaws.com/majid-allianceblock/organizations",
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
  ).then((res) => res.json()); */
  console.log(response);
}

export default function () {
  const searchParams = useSearchParams();
  const code = searchParams?.get("code") as string;
  const payload = code.split(".")[1];
  const decodedPayload = jwtDecode(payload);
  const parsedPayload = JSON.parse(decodedPayload);
  const htmlJson = JSON.stringify(parsedPayload, undefined, 2);
  const { organizationId, role } = parsedPayload;
  const mustCreateOrganization =
    organizationId === undefined && role === LoginTypes.ApiUser;
  return mustCreateOrganization ? (
    <div className="flex flex-col justify-between items-center gap-10">
      <div className="flex items-center gap-5 flex-col pt-6">
        <h2>First create an organization</h2>
        <Input type="text" placeholder="Organization name" id="name" />
        <Button asChild onClick={() => createOrganization(code)}>
          <Link href="">Create</Link>
        </Button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-between items-center gap-10">
      <div className="flex items-center gap-5 flex-col pt-6">
        <h2>You are now logged in:</h2>
        <pre className="text-gray-500 bg-slate-100 p-6 rounded-md border border-solid border-slate-200">
          {htmlJson}
        </pre>
      </div>
      <div className="flex items-center gap-5 flex-col pt-6">
        <h2>Created applications</h2>
        <div></div>
        <Button>Create application</Button>
      </div>
      <div>
        <Button asChild>
          <Link href="/">Log out</Link>
        </Button>
      </div>
    </div>
  );
}
