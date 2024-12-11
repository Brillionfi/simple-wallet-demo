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
import {
  IWallet,
  WalletFormats,
} from "@brillionfi/wallet-infra-sdk/dist/models/wallet.models";
import { Input } from "../ui/input";
import { useWallet } from "@brillionfi/waas-react-sdk";
import { getAuthentication } from "@/utils/getAuthentication";

export const WalletInput = () => {
  const { createWallet } = useWallet();

  const [format, setFormat] = useState<WalletFormats | undefined>(undefined);
  const [walletName, setWalletName] = useState<string | undefined>( undefined);
  const [authType, setAuthType] = useState<TAuthType | null>(null);
  const [errorStatus, setErrorStatus] = useState<string>("");
  
  const handleCreateWallet = async () => {
    if (!format || !authType || !walletName) return;
    const walletFormat = format.toLowerCase() as WalletFormats;
    await createWallet({
      name: walletName,
      format: walletFormat,
      authentication: await getAuthentication(walletName, "localhost"),
    });
  };

  return (
    <div>
      <div className="flex justify-between gap-5 w-full">
        <Input
          placeholder={"Wallet name"}
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
                <SelectItem value={value} key={`walletFormats-${index}`}>
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
      <div>
        <small className="text-red-500">{errorStatus}</small>
      </div>
    </div>
  );
};
