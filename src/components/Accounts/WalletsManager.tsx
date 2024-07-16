import { WalletInput } from "./WalletInput";
import { getWallets } from "@/lib/getWallets";
import { WalletsTable } from "./WalletsTable";

export const WalletsManager = ({
  jwt,
  account,
  setAccount,
  setChain,
}: {
  jwt: string;
  account?: string;
  setAccount: (address: string) => void;
  setChain: (chain: string) => void;
}) => {
  const wallets = getWallets(jwt);
  return (
    <div className="flex gap-5 flex-col w-full">
      <div className="flex w-full justify-between items-end">
        <div>
          <h2 className="inline">Accounts</h2>
          <i className="text-xs"> - (email based)</i>
        </div>
      </div>
      <WalletInput jwt={jwt} wallets={wallets} />
      {!!wallets?.length && (
        <WalletsTable
          wallets={wallets}
          account={account}
          setAccount={setAccount}
          setChain={setChain}
        />
      )}
    </div>
  );
};
