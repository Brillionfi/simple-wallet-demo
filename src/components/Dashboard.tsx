import { LoginTypes } from "@/utils/types";
import { SessionManager } from "./SessionManager";
import { WalletsManager } from "./Accounts/WalletsManager";
import { useState } from "react";
import { Portfolio } from "./Portfolio";

export const Dashboard = ({
  json,
  jwt,
  payload,
}: {
  json: string;
  jwt: string;
  payload: Record<string, string>;
}) => {
  const [account, setAccount] = useState<string>();
  const [chain, setChain] = useState<string>();
  const role = payload.role as LoginTypes;
  const title = payload.orgName;
  return (
    <div className="flex flex-col min-h-screen items-center gap-10 w-[600px] justify-center">
      <h1 className="text-xl">
        {title ? "Dashboard for " + title : "Application"}
      </h1>
      <SessionManager json={json} jwt={jwt} />
      {role === LoginTypes.WalletUser && (
        <WalletsManager
          jwt={jwt}
          account={account}
          setAccount={setAccount}
          setChain={setChain}
        />
      )}
      {account && chain && (
        <Portfolio jwt={jwt} account={account} chain={chain} />
      )}
    </div>
  );
};
