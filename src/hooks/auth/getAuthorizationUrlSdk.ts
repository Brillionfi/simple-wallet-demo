import { AuthProvider, WalletInfra } from '@brillionfi/wallet-infra-sdk';

export function getAuthorizationUrlSdk(provider: AuthProvider, appId: string, email?: string) {
  const walletInfra = new WalletInfra(appId, process.env.NEXT_PUBLIC_API_URL as string);
  const url = walletInfra.generateAuthUrl({
    provider,
    redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/home`,
    email,
  });
  return url;
}
