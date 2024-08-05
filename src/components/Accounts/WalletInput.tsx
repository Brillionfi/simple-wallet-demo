import { useState } from "react";
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
import { Input } from "../ui/input";


const USE_SDK = process.env.NEXT_PUBLIC_USE_SDK === "true";

export const WalletInput = ({
  jwt,
  wallets,
}: {
  jwt: string;
  wallets?: IWallet[];
}) => {

  const [format, setFormat] = useState<WalletFormats | undefined>(undefined);
  const [walletName, setWalletName] = useState<string | undefined>( undefined);
  const [authType, setAuthType] = useState<TAuthType | null>(null);
  const { createWalletSdk } = useWalletInfraSdk();

  
  const handleCreateWallet = async () => {
    if (!format || !authType || !walletName) return;
    console.log(walletName)
    if (USE_SDK) {
      // todo: retrieve wallet name from user input
      const walletFormat = format.toLowerCase() as WalletFormats;
      const wallet = await createWalletSdk(walletName, walletFormat);
      console.log("Wallet created:", wallet);
    } else {
      await createWallet(walletName, format, jwt);
    }
  };

  const allWalletsCreated =
    wallets?.length === Object.keys(WalletFormats).length;

  return allWalletsCreated ? null : (
    <div className="flex justify-between gap-5 w-full">
      <Input
        placeholder={"Wallet name"}
        className="h-6 m-2 w-4/6 text-xs"
        type="text"
        value={walletName}
        onChange={(e) => setWalletName(e.target.value)}
      />
      <Select
        onValueChange={(value: WalletFormats) => setFormat(value)}
        value={format}
      >
        <SelectTrigger>
          <SelectValue placeholder="Wallet format" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(WalletFormats).map((value, index) => {
            return (
                <SelectItem value={value} key={index}>
                  {value}
                </SelectItem>
              
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
      <Button onClick={handleCreateWallet} disabled={!authType || !format}>
        Create
      </Button>
    </div>
  );
};
