import { LoginTypes } from "@/utils/types";
import { ApplicationsManager } from "./Applications/ApplicationsManager";
import { SessionManager } from "./SessionManager";
import { WalletsManager } from "./Wallets/WalletsManager";

export const Dashboard = ({
  json,
  jwt,
  payload,
}: {
  json: string;
  jwt: string;
  payload: Record<string, string>;
}) => {
  const role = payload.role as LoginTypes;
  const title = payload.orgName;
  return (
    <div className="flex flex-col min-h-screen items-center gap-10 w-[600px] justify-center">
      <h1 className="text-xl">{title}</h1>
      <SessionManager json={json} jwt={jwt} />
      {role !== LoginTypes.WalletUser && (
        <ApplicationsManager jwt={jwt} role={role} />
      )}
      {role === LoginTypes.WalletUser && <WalletsManager jwt={jwt} />}
    </div>
  );
};
