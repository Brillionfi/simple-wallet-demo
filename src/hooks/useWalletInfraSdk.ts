import { ChainId, WalletInfra } from '@brillionfi/wallet-infra-sdk';
import { useWalletInfra } from '@/contexts/WalletInfraContext';
import { createWalletSdk } from './wallet/createWallet';
import { signTransactionSdk } from './wallet/signTransaction';
import { WalletFormats, WalletTypes } from '@brillionfi/wallet-infra-sdk/dist/models/wallet.models';
import { getWalletsSdk } from './wallet/getWallets';
import { getNotificationsSdk } from './wallet/getNotifications';
import { ApproveTransactionSdk, createTransactionSdk, RejectTransactionSdk } from './transaction/createTransaction';
import { getPortfolioSdk } from './portfolio/getPortfolio';
import { HOSTNAME } from '@/utils/constants';

export const useWalletInfraSdk = (onError?: (message: string) => void) => {
  const walletInfra = useWalletInfra() as WalletInfra;
  const FromOrigin = HOSTNAME; // or window.location.hostname;

  return {
    createWalletSdk: (walletName: string, walletFormat: WalletFormats) =>
      createWalletSdk(walletInfra, walletName, walletFormat, HOSTNAME, onError),

    getWalletsSdk: () => getWalletsSdk(walletInfra),
    getWalletPortfolioSdk: (address: string, chainId: ChainId) => getPortfolioSdk(walletInfra, address, chainId),

    getPortfolioSdk: (address: string, chain: string) => getPortfolioSdk(walletInfra, address, chain),

    createTransactionSdk: (fromAddress: string, toAddress: string, value: string, data: string, chainId: ChainId) =>
      createTransactionSdk(walletInfra, fromAddress, toAddress, value, data, chainId),

    signTransaction: (
      address: string,
      walletType: WalletTypes,
      walletFormat: WalletFormats,
      unsignedTransaction: string,
    ) => signTransactionSdk(walletInfra, FromOrigin, address, walletType, walletFormat, unsignedTransaction),

    getNotifications: () => getNotificationsSdk(walletInfra),

    approveTransaction: (address: string, organizationId: string, fingerprint: string) =>
      ApproveTransactionSdk(walletInfra, address, organizationId, fingerprint, FromOrigin),

    rejectTransaction: (address: string, organizationId: string, fingerprint: string) =>
      RejectTransactionSdk(walletInfra, address, organizationId, fingerprint, FromOrigin),
  };
};
