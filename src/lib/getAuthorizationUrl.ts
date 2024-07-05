import {BASE_URL} from "@/utils/constants";
import {LoginTypes, OAuthProviders} from "@/utils/types";

export function getAuthorizationUrl(loginType: LoginTypes, appId?: string) {
  const params = {
    oAuthProvider: OAuthProviders.Google,
    loginType,
    redirectUrl: "http://localhost:3000/home",
  };
  const url = new URL(`${BASE_URL}/users/login`);
  const query = new URLSearchParams(appId ? {...params, appId} : params);
  url.search = query.toString();
  return url;
}
