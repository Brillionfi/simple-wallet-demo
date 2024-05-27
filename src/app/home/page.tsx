"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { createOrganization } from "@/lib/create-organization";
import { jwtDecode } from "@/utils/jwt-decode";
import { LoginTypes } from "@/utils/types";

export default function () {
  const searchParams = useSearchParams();
  const code = searchParams?.get("code") as string;
  const payload = JSON.parse(jwtDecode(code.split(".")[1]));
  const json = JSON.stringify(payload, undefined, 2);
  return payload.role === LoginTypes.OrgOwner ? (
    <ShowDashboard json={json} />
  ) : (
    <CreateOrganization code={code} />
  );
}

const CreateOrganization = ({ code }: { code: string }) => (
  <div className="flex flex-col justify-between items-center gap-10">
    <div className="flex items-center gap-5 flex-col pt-6">
      <h2>First create an organization</h2>
      <Input type="text" placeholder="Organization name" id="name" />
      <Button asChild onClick={() => createOrganization(code)}>
        <Link href="">Create</Link>
      </Button>
    </div>
  </div>
);

const ShowDashboard = ({ json }: { json: string }) => (
  <div className="flex flex-col justify-between items-center gap-10">
    <div className="flex items-center gap-5 flex-col pt-6">
      <h2>You are now logged in:</h2>
      <pre className="text-gray-500 bg-slate-100 p-6 rounded-md border border-solid border-slate-200">
        {json}
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
