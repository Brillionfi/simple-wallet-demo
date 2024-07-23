import {
  WalletInfra,
} from "@brillionfi/wallet-infra-sdk";
import { IWalletNotifications } from "@brillionfi/wallet-infra-sdk/dist/models/wallet.models";

export const approveOrRejectActivitySdk = async (
  walletInfra: WalletInfra,
  decision: boolean,
  organizationId: string,
  fingerprint: string,
  fromOrigin: string,
): Promise<IWalletNotifications> => {
  return await walletInfra.Wallet.approveOrRejectActivity(decision, organizationId, fingerprint, fromOrigin);
};