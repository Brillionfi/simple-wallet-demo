"use client";

import { createApp } from "@/lib/createApplication";
import { getAuthorizationUrl } from "@/lib/getAuthorization";
import { LoginTypes } from "@/utils/types";
import { Copy } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";
import { useState } from "react";
import { getApplications } from "@/lib/getApplications";

export const ApplicationsManager = ({
  jwt,
  role,
}: {
  jwt: string;
  role: LoginTypes;
}) => {
  const [lastAppName, setLastAppName] = useState("");
  const apps = getApplications(role, jwt, lastAppName);
  return (
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
              <tr className={`bg-slate-50 bg-sl`} key={index}>
                <td className="px-3 border-slate-200 border">
                  {application.name}
                </td>
                <td
                  className="px-3 border-slate-200 border active:bg-slate-200 hover:cursor-pointer w-1/12"
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
                <td className="px-3 border-slate-200 border w-1/12">
                  {application.status}
                </td>
                <td className="px-3 border-slate-200 border w-1/12">
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
        <Button onClick={() => createApp(jwt, setLastAppName)}>Create</Button>
      </div>
    </div>
  );
};
