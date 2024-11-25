import { AuthProvider, WalletInfra } from '@brillionfi/wallet-infra-sdk';
import { IAuthURLParams } from '@brillionfi/wallet-infra-sdk/dist/models';

export function getAuthorizationUrlSdk(provider: AuthProvider, appId: string, email?: string) {
  const walletInfra = new WalletInfra(appId, process.env.NEXT_PUBLIC_API_URL as string);

  const params: IAuthURLParams = {
    provider,
    redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/home`
  }
  if(email) params.email = email;

  const url = walletInfra.generateAuthUrl(params);
  return url;
}
