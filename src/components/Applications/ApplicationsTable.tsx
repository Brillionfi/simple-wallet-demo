import { getAuthorizationUrl } from "@/lib/getAuthorization";
import { LoginTypes, type TApplication } from "@/utils/types";
import { Button } from "./../ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { CopyHelper } from "./../ui/copy";

export const ApplicationsTable = ({ apps }: { apps: TApplication[] }) => {
  const thStyle = "text-center font-normal border-slate-200 border py-2 px-3";
  const tdStyle = "px-3 border-slate-200 border";
  return (
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
            <td className={`${tdStyle} w-1/12`}>
              <CopyHelper
                clipboard={app.apiKey}
                content={`${app.apiKey.slice(0, 4)}...${app.apiKey.slice(
                  app.apiKey.length - 4,
                  app.apiKey.length
                )}`}
              />
            </td>
            <td className={`${tdStyle} w-1/12`}>{app.status}</td>
            <td className={`${tdStyle} w-1/12`}>
              <Button variant="link" asChild>
                <Link
                  href={getAuthorizationUrl(LoginTypes.WalletUser, app.apiKey)}
                  target="_blank"
                >
                  <ExternalLink size={15} className={"stroke-gray-500"} />
                </Link>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
