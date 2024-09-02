import { WalletInfra } from '@brillionfi/wallet-infra-sdk';
import { SUPPORTED_CHAINS } from '@brillionfi/wallet-infra-sdk/dist/models/common.models';
import type { IWalletPortfolio } from '@brillionfi/wallet-infra-sdk/dist/models/wallet.models';

export const getPortfolioSdk = async (
  walletInfra: WalletInfra,
  address: string,
  chain: string,
): Promise<IWalletPortfolio> => {
  return await walletInfra.Wallet.getPortfolio(address, chain as SUPPORTED_CHAINS);
};
