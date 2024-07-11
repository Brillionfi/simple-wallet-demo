import { useWalletInfraSdk } from "@/hooks/useWalletInfraSdk";
import { SUPPORTED_CHAINS } from "@brillionfi/wallet-infra-sdk/dist/models/common.models";

export async function send(/* asset: {
  chainId: string;
  tokenId: string;
  balance: string;
  address?: string | undefined;
  decimals?: number | undefined;
  tokenPriceUsd?: string | undefined;
} */) {
  console.log("sending");
  const { createTransactionSdk } = useWalletInfraSdk();
  const tx = await createTransactionSdk(
    "0x9cc6b19943ea4184c1e54272ce7fbe79e821523c",
    "0x9f3034d4ef264079e74a738853d17bc33a498769",
    "0.00001",
    "",
    SUPPORTED_CHAINS.ETHEREUM_SEPOLIA
  );
  console.log(tx);
}
