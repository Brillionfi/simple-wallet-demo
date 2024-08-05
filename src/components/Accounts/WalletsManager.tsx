import { WalletInput } from "./WalletInput";
import { useGetWallets } from "@/lib/getWallets";
import { WalletsTable } from "./WalletsTable";
import { WalletFormats, WalletTypes } from "@brillionfi/wallet-infra-sdk/dist/models/wallet.models";

export const WalletsManager = ({
  jwt,
  account,
  setAccount,
  setFormat,
  setWalletType,
}: {
  jwt: string;
  account?: string;
  setAccount: (address: string) => void;
  setFormat: (format: WalletFormats) => void;
  setWalletType: (walletType: WalletTypes) => void;
}) => {
  const wallets = useGetWallets(jwt);
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
          setFormat={setFormat}
          setWalletType={setWalletType}
        />
      )}
    </div>
  );
};
