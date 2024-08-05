import { ChainId, WalletInfra } from '@brillionfi/wallet-infra-sdk';
import { WalletFormats, WalletTypes } from '@brillionfi/wallet-infra-sdk/dist/models/wallet.models';

import { getPortfolioSdk } from './portfolio/getPortfolio';
import { createTransactionSdk } from './transaction/createTransaction';
import { createWalletSdk } from './wallet/createWallet';
import { getWalletsSdk } from './wallet/getWallets';
import { signTransactionSdk } from './wallet/signTransaction';
import { useWalletInfra } from '../contexts/WalletInfraContext';
import { HOSTNAME } from '../utils/constants';

export const useWalletInfraSdk = () => {
  const walletInfra = useWalletInfra() as WalletInfra;
  const FromOrigin = HOSTNAME; // or window.location.hostname;

  return {
    createWalletSdk: (walletName: string, walletFormat: WalletFormats) =>
      createWalletSdk(walletInfra, walletName, walletFormat),

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
  };
};
