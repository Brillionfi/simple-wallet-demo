import {ChainId, WalletInfra} from "@brillionfi/wallet-infra-sdk";
import {IWalletPortfolio} from "@brillionfi/wallet-infra-sdk/dist/models/wallet.models";

export const getPortfolioSdk = async (
  walletInfra: WalletInfra,
  address: string,
  chainId: ChainId
): Promise<IWalletPortfolio> => {
  const walletPortfolio: IWalletPortfolio =
    await walletInfra.Wallet.getPortfolio(address, chainId);
  return walletPortfolio;
};
