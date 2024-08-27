import { B2B_API_URL } from '@/utils/constants';
import { useWalletInfraSdk } from '@/hooks/useWalletInfraSdk';
import { useQuery } from '@tanstack/react-query';

const USE_SDK = process.env.NEXT_PUBLIC_USE_SDK === 'true';

export const getWalletActions = (jwt: string) => {
  const { getNotifications } = useWalletInfraSdk();
  const { data } = useQuery({
    refetchInterval: 10000,
    queryKey: ['GetWalletActions'],
    queryFn: async () => {
      if (USE_SDK) {
        return await getNotifications();
      } else {
        const response = await fetch(`${B2B_API_URL}/wallets/notifications`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        const { messages } = await response.json();
        return messages;
      }
    },
  });
  return data;
};
