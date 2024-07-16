import { WalletFormats } from "@brillionfi/wallet-infra-sdk/dist/models/wallet.models";

export enum OAuthProviders {
  Google = "Google",
}

export enum LoginTypes {
  ApiUser = "API_USER",
  WalletUser = "WALLET_USER",
  OrgOwner = "ORG_OWNER",
}

export type TApplication = {
  apiKey: string;
  name: string;
  status: "ACTIVE";
};

export type TAuthType = "passkey";
