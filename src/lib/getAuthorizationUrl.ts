import { AuthProvider } from '@brillionfi/wallet-infra-sdk';
import { B2B_API_URL, BASE_URL } from '../utils/constants';
import { LoginTypes } from '../utils/types';

export function getAuthorizationUrl({loginType, provider, appId, email}: {loginType: LoginTypes, provider: AuthProvider, appId?: string, email?: string}) {
  const params:{
    provider: AuthProvider;
    loginType: LoginTypes;
    redirectUrl: string;
    appId?: string;
    email?: string;
  } = {
    provider,
    loginType,
    redirectUrl: `${BASE_URL}/home`,
  };

  const url = new URL(`${B2B_API_URL}/users/login`);

  if(appId) params.appId = appId;
  if(email) params.email = email;

  const query = new URLSearchParams(params);
  console.log('query.toString() :>> ', query.toString());
  url.search = query.toString();
  return url;
}
