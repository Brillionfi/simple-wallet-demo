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

export type TChain = "ethereum" | "cosmos" | "tron" | "solana";

export type TAuthType = "passkey";

export type TWallet = {
  format: TChain;
  address: string;
  name: string;
  owner: string;
  type: string;
};
