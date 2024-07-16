import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { TAuthType } from "@/utils/types";
import { Button } from "../ui/button";
import { createWallet } from "@/lib/createWallet";
import { useWalletInfraSdk } from "@/hooks/useWalletInfraSdk";
import {
  IWallet,
  WalletFormats,
} from "@brillionfi/wallet-infra-sdk/dist/models/wallet.models";
import { ChainId } from "@brillionfi/wallet-infra-sdk";


const USE_SDK = process.env.NEXT_PUBLIC_USE_SDK === "true";

export const WalletInput = ({
  jwt,
  wallets,
}: {
  jwt: string;
  wallets?: IWallet[];
}) => {
  const [key, setKey] = useState(+new Date());
  const [chain, setChain] = useState<WalletFormats | undefined>(undefined);
  const [authType, setAuthType] = useState<TAuthType | null>(null);
  const { createWalletSdk } = useWalletInfraSdk();

  useEffect(() => {
    const exists = wallets?.find((wallet) => wallet.format === chain);
    if (exists) {
      setChain(undefined);
      setKey(+new Date());
    }
  }, [wallets, chain, setChain]);

  const handleCreateWallet = async () => {
    if (!chain || !authType) return;

    if (USE_SDK) {
      // todo: retrieve wallet name from user input
      const walletName = "wallet-test-name";
      const walletFormat = chain.toLowerCase() as WalletFormats;
      const wallet = await createWalletSdk(walletName, walletFormat);
      console.log("Wallet created:", wallet);
    } else {
      await createWallet(chain as unknown as ChainId, jwt);
    }
  };

  const allWalletsCreated =
    wallets?.length === Object.keys(WalletFormats).length;

  return allWalletsCreated ? null : (
    <div className="flex justify-between gap-5 w-full">
      <Select
        onValueChange={(value: WalletFormats) => setChain(value)}
        value={chain}
        key={key}
      >
        <SelectTrigger>
          <SelectValue placeholder="Wallet format" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(WalletFormats).map((value, index) => {
            const walletExists = wallets?.find(
              (wallet) => wallet.format === value
            );
            return (
              !walletExists && (
                <SelectItem value={value} key={index}>
                  {value}
                </SelectItem>
              )
            );
          })}
        </SelectContent>
      </Select>
      <Select onValueChange={(value: TAuthType) => setAuthType(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Authentication type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="passkey">Passkey</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleCreateWallet} disabled={!authType || !chain}>
        Create
      </Button>
    </div>
  );
};
