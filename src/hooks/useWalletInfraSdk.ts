import { ChainId, WalletInfra } from "@brillionfi/wallet-infra-sdk";
import { useWalletInfra } from "@/contexts/WalletInfraContext";
import { createWalletSdk } from "./wallet/createWallet";
import { WalletFormats } from "@brillionfi/wallet-infra-sdk/dist/models/wallet.models";
import { getWalletsSdk } from "./wallet/getWallets";
import { createTransactionSdk } from "./transaction/createTransaction";
import { getPortfolioSdk } from "./portfolio/getPortfolio";

export const useWalletInfraSdk = () => {
  const walletInfra = useWalletInfra() as WalletInfra;

  return {
    createWalletSdk: (walletName: string, walletFormat: WalletFormats) =>
      createWalletSdk(walletInfra, walletName, walletFormat),

    getWalletsSdk: () => getWalletsSdk(walletInfra),

    getPortfolioSdk: (address: string, chain: string) =>
      getPortfolioSdk(walletInfra, address, chain),

    createTransactionSdk: (
      fromAddress: string,
      toAddress: string,
      value: string,
      data: string,
      chainId: ChainId
    ) =>
      createTransactionSdk(
        walletInfra,
        fromAddress,
        toAddress,
        value,
        data,
        chainId
      ),
  };
};
