import { WalletInput } from "./WalletInput";
import { getWallets } from "@/lib/getWallets";
import { WalletsTable } from "./WalletsTable";

export const WalletsManager = ({ jwt }: { jwt: string }) => {
  const wallets = getWallets(jwt);
  return (
    <div className="flex gap-5 flex-col w-full">
      <div className="flex w-full justify-between items-end">
        <h2>Wallets</h2>
      </div>
      <WalletInput jwt={jwt} />
      {!!wallets?.length && <WalletsTable wallets={wallets} />}
    </div>
  );
};
