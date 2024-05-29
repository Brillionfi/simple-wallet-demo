import { createWallet } from "@/lib/createWallet";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import type { TAuthType, TChain } from "@/utils/types";

export const WalletManager = ({ jwt }: { jwt: string }) => {
  const [chain, setChain] = useState<TChain>();
  const [authType, setAuthType] = useState<TAuthType>();
  return (
    <div className="flex gap-5 flex-col w-full">
      <div className="flex w-full justify-between items-end">
        <h2>Wallet</h2>
      </div>
      <div className="flex justify-between gap-5 w-full">
        <Select onValueChange={(value: TChain) => setChain(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Wallet type" />
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
          onClick={() => createWallet(chain!, authType!, jwt)}
          disabled={!authType || !chain}
        >
          Create
        </Button>
      </div>
    </div>
  );
};
