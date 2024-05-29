import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TAuthType, TChain } from "@/utils/types";
import { Button } from "../ui/button";
import { createWallet } from "@/lib/createWallet";

export const WalletInput = ({ jwt }: { jwt: string }) => {
  const [chain, setChain] = useState<TChain>();
  const [authType, setAuthType] = useState<TAuthType>();
  return (
    <div className="flex justify-between gap-5 w-full">
      <Select onValueChange={(value: TChain) => setChain(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Wallet format" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ethereum">Ethereum</SelectItem>
          <SelectItem value="cosmos">Cosmos</SelectItem>
          <SelectItem value="tron">Tron</SelectItem>
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
      <Button
        onClick={() => createWallet(chain!, jwt)}
        disabled={!authType || !chain}
      >
        Create
      </Button>
    </div>
  );
};
