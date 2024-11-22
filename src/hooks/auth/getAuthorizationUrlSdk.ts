import { AuthProvider, WalletInfra } from '@brillionfi/wallet-infra-sdk';

type request = {
  provider: AuthProvider, appId: string, email?: string
}

type params = {
  provider: AuthProvider, redirectUrl: string, email?: string
}

export function getAuthorizationUrlSdk({provider, appId, email}: request) {
  const walletInfra = new WalletInfra(appId, process.env.NEXT_PUBLIC_API_URL as string);
  const params: params = {
    provider,
    redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/home`,
  }
  if(email) params.email = email;

  const url = walletInfra.generateAuthUrl(params);
  return url;
}
