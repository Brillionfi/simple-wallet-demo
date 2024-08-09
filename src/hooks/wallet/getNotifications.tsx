import {
  WalletInfra,
} from "@brillionfi/wallet-infra-sdk";
import { IWalletNotifications } from "@brillionfi/wallet-infra-sdk/dist/models/wallet.models";

export const getNotificationsSdk = async (
  walletInfra: WalletInfra,
): Promise<IWalletNotifications> => {
  return await walletInfra.Wallet.getNotifications();
};
