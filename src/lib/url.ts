enum OAuthProviders {
  Google = "Google",
}

export enum LoginTypes {
  ApiUser = "API_USER",
  WalletUser = "WALLET_USER",
}

export function getAuthorizationUrl(loginType: LoginTypes) {
  const params = {
    oAuthProvider: OAuthProviders.Google,
    loginType,
    redirectUrl: "http://localhost:3000/home",
  };
  const url = new URL(`${process.env.HOST}/users/login`);
  const query = new URLSearchParams(params);
  url.search = query.toString();
  return url;
}
