import { AuthProvider, WalletInfra } from '@brillionfi/wallet-infra-sdk';

export function getAuthorizationUrlSdk(appId: string) {
  const walletInfra = new WalletInfra(appId, process.env.NEXT_PUBLIC_API_URL as string);
  const url = walletInfra.generateAuthUrl(`${process.env.NEXT_PUBLIC_BASE_URL}/home`, AuthProvider.GOOGLE);
  return url;
}
