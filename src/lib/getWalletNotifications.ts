import { B2B_API_URL } from '@/utils/constants';
import { useWalletInfraSdk } from '@/hooks/useWalletInfraSdk';
import { useQuery } from '@tanstack/react-query';
import { SUPPORTED_CHAINS, TNotifications } from '@brillionfi/wallet-infra-sdk/dist/models';

const USE_SDK = process.env.NEXT_PUBLIC_USE_SDK === 'true';

export const getWalletNotifications = (jwt: string, chains: SUPPORTED_CHAINS[], address?: string) => {
  const { getNotifications } = useWalletInfraSdk();
  const { data } = useQuery({
    refetchInterval: 10000,
    queryKey: ['GetWalletActions'],
    queryFn: async () => {
      if (!address) {
        return undefined;
      }
      if (USE_SDK) {
        const notifications: TNotifications = { transactions: [], notifications: [] };
        await Promise.all(
          chains.map(async (chain) => {
            const notifs = await getNotifications(address, chain);
            console.log(notifs);
            notifications.transactions.push(...notifs.transactions);
            notifications.notifications.push(...notifs.notifications);
          }),
        );
        console.log(notifications);
        return notifications;
      } else {
        const notifications: TNotifications = { transactions: [], notifications: [] };
        chains.map(async (chain) => {
          const response = await fetch(`${B2B_API_URL}/${address}/chains/${chain}/transactions`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          });
          const { messages: transactions } = await response.json();
          const response2 = await fetch(`${B2B_API_URL}/notifications`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          });
          const { messages: notifications } = await response2.json();
          notifications.transactions.push(...transactions);
          notifications.notifications.push(...notifications);
        });
        return notifications;
      }
    },
  });
  return data;
};
