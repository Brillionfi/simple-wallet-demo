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
  const thStyle = "text-center font-normal border-slate-200 border py-2 px-3";
  const tdStyle = "px-3 border-slate-200 border";
  return (
    <div className="flex gap-5 flex-col w-full">
      <h2>Applications</h2>
      {apps?.length && (
        <table className="rounded-md overflow-hidden text-gray-500 border-solid border-slate-200 text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className={thStyle}>Name</th>
              <th className={thStyle}>API Key</th>
              <th className={thStyle}>Status</th>
              <th className={thStyle}>Link</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app, index) => (
              <tr className={`bg-slate-50 bg-sl`} key={index}>
                <td className={tdStyle}>{app.name}</td>
                <td
                  className={`${tdStyle} active:bg-slate-200 hover:cursor-pointer w-1/12`}
                  onClick={() => navigator.clipboard.writeText(app.apiKey)}
                >
                  <div className="flex gap-2 justify-center items-center">
                    <div>
                      {`${app.apiKey.slice(0, 4)}...${app.apiKey.slice(
                        app.apiKey.length - 4,
                        app.apiKey.length
                      )}`}
                    </div>
                    <Copy size={15} />
                  </div>
                </td>
                <td className={`${tdStyle} w-1/12`}>{app.status}</td>
                <td className={`${tdStyle} w-1/12`}>
                  <Button variant="link" asChild>
                    <Link
                      href={getAuthorizationUrl(
                        LoginTypes.WalletUser,
                        app.apiKey
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
