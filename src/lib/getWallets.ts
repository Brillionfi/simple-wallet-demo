import { useWalletInfraSdk } from "@/hooks/useWalletInfraSdk";
import { BASE_URL } from "@/utils/constants";
import type { IWallet } from "@brillionfi/wallet-infra-sdk";
import { useQuery } from "@tanstack/react-query";

const USE_SDK = process.env.NEXT_PUBLIC_USE_SDK === "true";

export const getWallets = (jwt: string) => {
  const { getWalletsSdk } = useWalletInfraSdk();
  const { data } = useQuery({
    refetchInterval: 6000,
    queryKey: ["GetWalletsList"],
    queryFn: async () => {
      if (USE_SDK) {
        const wallets: IWallet[] = await getWalletsSdk();
        return wallets;
      } else {
        const response = await fetch(`${BASE_URL}/wallets`, {
          method: "GET",
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
