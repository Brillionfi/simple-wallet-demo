import type { IWallet } from '@brillionfi/wallet-infra-sdk';
import { useQuery } from '@tanstack/react-query';

import { useWalletInfraSdk } from '../hooks/useWalletInfraSdk';
import { B2B_API_URL } from '../utils/constants';

const USE_SDK = process.env.NEXT_PUBLIC_USE_SDK === 'true';

export const useGetWallets = (jwt: string) => {
  const { getWalletsSdk } = useWalletInfraSdk();
  const { data } = useQuery({
    refetchInterval: 6000,
    queryKey: ['GetWalletsList'],
    queryFn: async () => {
      if (USE_SDK) {
        const wallets: IWallet[] = await getWalletsSdk();
        return wallets;
      } else {
        const response = await fetch(`${B2B_API_URL}/wallets`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        const wallets: IWallet[] = await response.json();
        return wallets;
      }
    },
  });
  return data;
};
