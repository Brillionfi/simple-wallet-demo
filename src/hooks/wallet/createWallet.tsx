import { IWallet, WalletInfra } from "@brillionfi/wallet-infra-sdk";
import { WalletFormats, WalletTypes } from "@brillionfi/wallet-infra-sdk/dist/models/wallet.models";
import { getAuthentication } from "@/utils/getTurnkeyAuthentication";
import { AxiosError, AxiosResponse } from 'axios';

export const createWalletSdk = async (walletInfra: WalletInfra, walletName: string, walletFormat: WalletFormats, domain: string, onError?: (message: string)=>void) => {
  const newWallet: IWallet = {
    type: WalletTypes.EOA,
    name: walletName,
    format: walletFormat,
    authentication: await getAuthentication(walletName, domain),
  };
  try {
    const wallet = await walletInfra.Wallet.createWallet(newWallet);
    return wallet;
  } catch (error) {
    const response = (error as AxiosError).response as AxiosResponse;
    if(onError) onError(response.data?.message)
  }
};
