import { AuthProvider, WalletInfra } from "@brillionfi/wallet-infra-sdk";

export function getAuthorizationUrlSdk(appId: string) {
  const walletInfra = new WalletInfra(
    appId,
    process.env.NEXT_PUBLIC_BASE_URL as string
  );
  const url = walletInfra.generateAuthUrl(
    "http://localhost:3000/home",
    AuthProvider.GOOGLE
  );
  return url;
}
