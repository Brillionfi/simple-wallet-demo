import {WalletInfra} from "@brillionfi/wallet-infra-sdk";
import {useWalletInfra} from "@/contexts/WalletInfraContext";
import {createWalletSdk} from "./wallet/createWallet";
import {WalletFormats} from "@brillionfi/wallet-infra-sdk/dist/models/wallet.models";
import {getWalletsSdk} from "./wallet/getWallets";

export const useWalletInfraSdk = () => {
  const walletInfra = useWalletInfra() as WalletInfra;

  return {
    createWalletSdk: (walletName: string, walletFormat: WalletFormats) =>
      createWalletSdk(walletInfra, walletName, walletFormat),

    getWalletsSdk: () => getWalletsSdk(walletInfra),
  };
};
