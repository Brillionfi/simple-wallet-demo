import { B2B_API_URL, BASE_URL } from "@/utils/constants";
import { AuthProvider, WalletInfra } from "@brillionfi/wallet-infra-sdk";

export function getAuthorizationUrlSdk(appId: string) {
  const walletInfra = new WalletInfra(appId, B2B_API_URL);
  const url = walletInfra.generateAuthUrl(
    `${BASE_URL}/home`,
    AuthProvider.GOOGLE
  );
  console.log(url);
  return url;
}
