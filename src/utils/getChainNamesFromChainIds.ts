import { SUPPORTED_CHAINS } from "@brillionfi/wallet-infra-sdk/dist/models/common.models";

export function getChainNamesFromChainIds(chainId: SUPPORTED_CHAINS): string {
  switch (chainId) {
    case SUPPORTED_CHAINS.ETHEREUM:
      return "ethereum";
    case SUPPORTED_CHAINS.ETHEREUM_SEPOLIA:
      return "sepolia";
    case SUPPORTED_CHAINS.POLYGON:
      return "polygon";
    case SUPPORTED_CHAINS.POLYGON_AMOY:
      return "amoy";
    case SUPPORTED_CHAINS.COSMOS:
      return "cosmos";
    case SUPPORTED_CHAINS.SOLANA:
      return "solana";
    case SUPPORTED_CHAINS.TRON:
      return "tron";
    default:
      return "unknown";
  }
}
