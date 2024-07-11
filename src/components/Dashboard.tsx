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
  const [format, setFormat] = useState<string>();
  const role = payload.role as LoginTypes;
  return (
    <div className="min-h-screen px-10 bg-white">
      <div className="flex flex-col items-center gap-10 w-[600px] justify-start mt-7">
        <SessionManager json={json} jwt={jwt} />
        {role === LoginTypes.WalletUser && (
          <WalletsManager
            jwt={jwt}
            account={account}
            setAccount={setAccount}
            setChain={setFormat}
          />
        )}
        {account && format && (
          <Portfolio jwt={jwt} account={account} format={format} />
        )}
      </div>
    </div>
  );
};
