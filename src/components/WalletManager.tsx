import { createWallet } from "@/lib/createWallet";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const WalletManager = () => {
  return (
    <div className="flex gap-5 flex-col w-full">
      <div className="flex w-full justify-between items-end">
        <h2>Wallet</h2>
      </div>
      <div className="flex justify-between gap-5 w-full">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Wallet type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ethereum">Ethereum</SelectItem>
            <SelectItem value="solana">Solana</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Authentication type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="biometric">Biometric</SelectItem>
            <SelectItem value="passkey">Passkey</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={createWallet}>Create</Button>
      </div>
    </div>
  );
};
