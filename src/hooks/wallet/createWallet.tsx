import { IWallet, WalletInfra } from "@brillionfi/wallet-infra-sdk";
import { WalletFormats, WalletTypes } from "@brillionfi/wallet-infra-sdk/dist/models/wallet.models";
import { getAuthentication } from "@/utils/getTurnkeyAuthentication";

export const createWalletSdk = async (walletInfra: WalletInfra, walletName: string, walletFormat: WalletFormats) => {
  const newWallet: IWallet = {
    type: WalletTypes.EOA,
    name: walletName,
    format: walletFormat,
    authentication: await getAuthentication(walletName),
  };

  const wallet = await walletInfra.Wallet.createWallet(newWallet);

  return wallet;
};
