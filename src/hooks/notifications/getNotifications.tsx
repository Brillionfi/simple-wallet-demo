import { WalletInfra } from '@brillionfi/wallet-infra-sdk';
import { SUPPORTED_CHAINS, TNotifications } from '@brillionfi/wallet-infra-sdk/dist/models';

export const getNotificationsSdk = async (
  walletInfra: WalletInfra,
  address: string,
  chainId: SUPPORTED_CHAINS,
): Promise<TNotifications> => {
  return await walletInfra.Notifications.getNotifications(address, chainId);
};
