import {IWallet, WalletInfra} from "@brillionfi/wallet-infra-sdk";

export const getWalletsSdk = async (
  walletInfra: WalletInfra
): Promise<IWallet[]> => {
  const wallets: IWallet[] = await walletInfra.Wallet.getWallets();
  return wallets;
};
