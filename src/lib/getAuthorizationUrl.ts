import { B2B_API_URL, BASE_URL } from "@/utils/constants";
import { LoginTypes, OAuthProviders } from "@/utils/types";

export function getAuthorizationUrl(loginType: LoginTypes, appId?: string) {
  const params = {
    oAuthProvider: OAuthProviders.Google,
    loginType,
    redirectUrl: `${BASE_URL}/home`,
  };
  const url = new URL(`${B2B_API_URL}/users/login`);
  const query = new URLSearchParams(appId ? { ...params, appId } : params);
  url.search = query.toString();
  return url;
}
