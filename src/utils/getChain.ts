import { SUPPORTED_CHAINS } from '@brillionfi/wallet-infra-sdk/dist/models/common.models';

export function getChain(chain: string): SUPPORTED_CHAINS {
  switch (chain) {
    case 'ethereum':
      return SUPPORTED_CHAINS.ETHEREUM;
    case 'cosmos':
      return SUPPORTED_CHAINS.COSMOS;
    case 'solana':
      return SUPPORTED_CHAINS.SOLANA;
    case 'tron':
      return SUPPORTED_CHAINS.TRON;
    default:
      return SUPPORTED_CHAINS.ETHEREUM;
  }
}
