import {useState} from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {TAuthType, TChain} from "@/utils/types";
import {Button} from "../ui/button";
import {createWallet} from "@/lib/createWallet";
import {useWalletInfraSdk} from "@/hooks/useWalletInfraSdk";
import {WalletFormats} from "@brillionfi/wallet-infra-sdk/dist/models/wallet.models";
import {SUPPORTED_CHAINS} from "@brillionfi/wallet-infra-sdk/dist/models/common.models";

export const WalletInput = ({jwt}: {jwt: string}) => {
  const [chain, setChain] = useState<TChain | null>(null);
  const [authType, setAuthType] = useState<TAuthType | null>(null);
  const {createWalletSdk, getWalletPortfolioSdk} = useWalletInfraSdk();

  const handleCreateWallet = async () => {
    if (!chain || !authType) return;

    const useSdk = process.env.NEXT_PUBLIC_USE_SDK === "true";

    if (useSdk) {
      // todo: retrieve wallet name from user input
      // todo: show wallet balance in the UI
      const walletName = "wallet-test-name";
      const walletFormat = chain.toLowerCase() as WalletFormats;
      const wallet = await createWalletSdk(walletName, walletFormat);
      console.log("Wallet created:", wallet);

      const {portfolio} = await getWalletPortfolioSdk(
        wallet.address as string,
        SUPPORTED_CHAINS.ETHEREUM_SEPOLIA
      );

      console.log("Wallet balance:", portfolio[0].balance);
    } else {
      await createWallet(chain, jwt);
    }
  };

  return (
    <div className="flex justify-between gap-5 w-full">
      <Select onValueChange={(value: TChain) => setChain(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Wallet format" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ethereum">Ethereum</SelectItem>
          <SelectItem value="cosmos">Cosmos</SelectItem>
          <SelectItem value="solana">Solana</SelectItem>
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
      <Button onClick={handleCreateWallet} disabled={!authType || !chain}>
        Create
      </Button>
    </div>
  );
};
