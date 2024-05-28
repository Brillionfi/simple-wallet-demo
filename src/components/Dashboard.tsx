"use client";

import { LoginTypes } from "@/utils/types";
import { ApplicationsManager } from "./ApplicationsManager";
import { SessionManager } from "./SessionManager";

export const Dashboard = ({
  json,
  jwt,
  role,
}: {
  json: string;
  jwt: string;
  role: LoginTypes;
}) => {
  return (
    <div className="flex flex-col min-h-screen items-center gap-10 w-[500px] justify-center">
      <SessionManager json={json} jwt={jwt} />
      {role !== LoginTypes.WalletUser && (
        <ApplicationsManager jwt={jwt} role={role} />
      )}
    </div>
  );
};
