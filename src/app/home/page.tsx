"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { createOrganization } from "@/lib/createOrganization";
import { jwtDecode } from "@/utils/jwt-decode";
import { LoginTypes } from "@/utils/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getApplications } from "@/lib/getApplications";
import { useState } from "react";
import { createApp } from "@/lib/createApplication";
import { logOut } from "@/lib/logOut";

const queryClient = new QueryClient();

export default function () {
  const searchParams = useSearchParams();
  const jwt = searchParams?.get("code") as string;
  document.cookie = `session=${jwt}`;
  const payload = JSON.parse(jwtDecode(jwt.split(".")[1]));
  const json = JSON.stringify(payload, undefined, 2);
  return payload.role !== LoginTypes.ApiUser ? (
    <QueryClientProvider client={queryClient}>
      <ShowDashboard json={json} jwt={jwt} role={payload.role} />
    </QueryClientProvider>
  ) : (
    <CreateOrganization jwt={jwt} />
  );
}

const CreateOrganization = ({ jwt }: { jwt: string }) => (
  <div className="flex flex-col justify-between items-center gap-10">
    <div className="flex gap-5 flex-col pt-6">
      <h2>First create an organization</h2>
      <Input
        type="text"
        placeholder="Organization name"
        id="name"
        autoComplete={"off"}
      />
      <Button asChild onClick={() => createOrganization(jwt)}>
        <Link href="">Create</Link>
      </Button>
    </div>
  </div>
);

const ShowDashboard = ({
  json,
  jwt,
  role,
}: {
  json: string;
  jwt: string;
  role: LoginTypes;
}) => {
  const [lastAppName, setLastAppName] = useState("");
  const apps = getApplications(role, jwt, lastAppName);
  return (
    <div className="flex flex-col min-h-screen items-center gap-10 w-[600px] justify-center">
      <div className="flex gap-5 flex-col w-full">
        <div className="flex w-full justify-between items-end">
          <h2>Session</h2>
          <Button onClick={() => logOut(jwt)}>Log Out</Button>
        </div>
        <pre className="text-gray-500 bg-slate-100 py-6 px-10 rounded-md border border-solid border-slate-200">
          {json}
        </pre>
      </div>
      {role !== LoginTypes.WalletUser && (
        <div className="flex gap-5 flex-col w-full">
          <h2>Applications</h2>
          {apps && (
            <table className="rounded-md overflow-hidden text-gray-500 bg-slate-100 border border-solid border-slate-200">
              <thead className="bg-slate-200">
                <tr>
                  <th className="text-center border border-slate-200 py-2 px-3">
                    Name
                  </th>
                  <th className="text-center border border-slate-200 py-2 px-3">
                    API Key
                  </th>
                  <th className="text-center border border-slate-200 py-2 px-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {apps.map((application, index) => (
                  <tr className="p-6" key={index}>
                    <td className="border border-slate-200 py-2 px-3">
                      {application.name}
                    </td>
                    <td className="border border-slate-200 py-2 px-3">
                      {application.apiKey}
                    </td>
                    <td className="border border-slate-200 py-2 px-3">
                      {application.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="flex justify-between gap-5 w-full">
            <Input
              autoComplete={"off"}
              type="text"
              placeholder="Application name"
              id="app"
            />
            <Input
              autoComplete={"off"}
              type="text"
              placeholder="Public key"
              id="pkey"
            />
            <Button onClick={() => createApp(jwt, setLastAppName)}>
              Create
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
