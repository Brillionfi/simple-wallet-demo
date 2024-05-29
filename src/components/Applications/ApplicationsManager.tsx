import { LoginTypes } from "@/utils/types";
import { useState } from "react";
import { getApplications } from "@/lib/getApplications";
import { ApplicationsTable } from "./ApplicationsTable";
import { ApplicationInput } from "./ApplicationInput";

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
      <ApplicationInput jwt={jwt} setLastAppName={setLastAppName} />
      {apps?.length && <ApplicationsTable apps={apps} />}
    </div>
  );
};
