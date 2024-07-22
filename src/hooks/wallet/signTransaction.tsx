import {
  WalletInfra,
} from "@brillionfi/wallet-infra-sdk";
import { IWalletSignTransaction, WalletFormats, WalletTypes } from "@brillionfi/wallet-infra-sdk/dist/models/wallet.models";

export const signTransactionSdk = async (
  walletInfra: WalletInfra,
  fromOrigin: string,
  address: string,
  walletType: WalletTypes,
  walletFormat: WalletFormats,
  unsignedTransaction: string,
): Promise<string> => {
  const data: IWalletSignTransaction = {
    walletType,
    walletFormat,
    unsignedTransaction,
  };

  const { signedTransaction } = await walletInfra.Wallet.signTransaction(address, data, fromOrigin);
  
  if(!signedTransaction) return "Something went wrong";

  return signedTransaction;
};
