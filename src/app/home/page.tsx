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
import { getAuthorizationUrl } from "@/lib/getAuthorization";
import { Copy } from "lucide-react";

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

const CreateOrganization = ({ jwt }: { jwt: string }) => {
  const [isError, setError] = useState(false);
  return (
    <div className="flex flex-col min-h-screen items-center gap-10 w-[600px] justify-center">
      <div className="flex gap-5 flex-col pt-6 w-full">
        <h2>First create an organization</h2>
        <div className="flex justify-between gap-5 w-full">
          <Input
            type="text"
            placeholder="Organization name"
            id="name"
            autoComplete={"off"}
          />
          <Button asChild onClick={() => createOrganization(jwt, setError)}>
            <Link href="">Create</Link>
          </Button>
        </div>
        {isError && (
          <p className="py-1 px-3 bg-red-100 rounded-md border border-red-200 text-red-400 text-sm text-center">
            User already has org, or org name already exists
          </p>
        )}
      </div>
      <Button onClick={() => logOut(jwt)}>Log Out</Button>
    </div>
  );
};

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
        <pre className="text-gray-500 bg-slate-50 py-6 px-10 rounded-md border border-solid border-slate-200 text-sm">
          {json}
        </pre>
      </div>
      {role !== LoginTypes.WalletUser && (
        <div className="flex gap-5 flex-col w-full">
          <h2>Applications</h2>
          {apps?.length && (
            <table className="rounded-md overflow-hidden text-gray-500 border-solid border-slate-200 text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-center font-normal border-slate-200 border py-2 px-3">
                    Name
                  </th>
                  <th className="text-center font-normal border-slate-200 border py-2 px-3">
                    API Key
                  </th>
                  <th className="text-center font-normal border-slate-200 border py-2 px-3">
                    Status
                  </th>
                  <th className="text-center font-normal border-slate-200 border py-2 px-3">
                    Link
                  </th>
                </tr>
              </thead>
              <tbody>
                {apps.map((application, index) => (
                  <tr className={`p-6 bg-slate-50 bg-sl`} key={index}>
                    <td className="py-2 px-3 border-slate-200 border">
                      {application.name}
                    </td>
                    <td
                      className="py-2 px-3 border-slate-200 border active:bg-slate-200 hover:cursor-pointer"
                      onClick={() =>
                        navigator.clipboard.writeText(application.apiKey)
                      }
                    >
                      <div className="flex gap-2 justify-center items-center">
                        <div>
                          {`${application.apiKey.slice(
                            0,
                            4
                          )}...${application.apiKey.slice(
                            application.apiKey.length - 4,
                            application.apiKey.length
                          )}`}
                        </div>
                        <Copy size={15} />
                      </div>
                    </td>
                    <td className="py-2 px-3 border-slate-200 border w-1/12">
                      {application.status}
                    </td>
                    <td className="py-2 px-3 border-slate-200 border w-1/12">
                      <Button variant="secondary" asChild>
                        <Link
                          href={getAuthorizationUrl(
                            LoginTypes.WalletUser,
                            application.apiKey
                          )}
                          target="_blank"
                        >
                          Log in
                        </Link>
                      </Button>
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
