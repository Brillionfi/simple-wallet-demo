import { useWalletInfraSdk } from "@/hooks/useWalletInfraSdk";
import { B2B_API_URL } from "@/utils/constants";
import type { ChainId } from "@brillionfi/wallet-infra-sdk";
import { IWalletPortfolio } from "@brillionfi/wallet-infra-sdk/dist/models/wallet.models";
import { useQuery } from "@tanstack/react-query";

const USE_SDK = process.env.NEXT_PUBLIC_USE_SDK === "true";

export const getPortfolio = (jwt: string, address: string, chain: ChainId) => {
  const { getPortfolioSdk } = useWalletInfraSdk();
  const { data } = useQuery({
    refetchInterval: 30000,
    queryKey: ["GetPortfolio"],
    queryFn: async () => {
      if (USE_SDK) {
        const portfolio: IWalletPortfolio = await getPortfolioSdk(
          address,
          chain
        );
        return portfolio;
      } else {
        const response = await fetch(
          `${B2B_API_URL}/wallets/portfolio/${address}/${chain}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const portfolio: IWalletPortfolio = await response.json();
        return portfolio;
      }
    },
  });
  return data;
};
