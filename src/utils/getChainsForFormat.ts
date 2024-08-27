import { SUPPORTED_CHAINS } from '@brillionfi/wallet-infra-sdk/dist/models/common.models';

export function getChainsForFormat(format?: string): SUPPORTED_CHAINS[] {
  switch (format) {
    case 'ethereum':
      return [SUPPORTED_CHAINS.ETHEREUM_SEPOLIA, SUPPORTED_CHAINS.ETHEREUM, SUPPORTED_CHAINS.POLYGON];
    case 'cosmos':
      return [SUPPORTED_CHAINS.COSMOS];
    case 'solana':
      return [SUPPORTED_CHAINS.SOLANA];
    case 'tron':
      return [SUPPORTED_CHAINS.TRON];
    default:
      return [];
  }
}
