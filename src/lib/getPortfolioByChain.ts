import { useWalletInfraSdk } from "@/hooks/useWalletInfraSdk";
import { BASE_URL } from "@/utils/constants";
import { SUPPORTED_CHAINS } from "@brillionfi/wallet-infra-sdk/dist/models/common.models";
import type { IWalletPortfolio } from "@brillionfi/wallet-infra-sdk/dist/models/wallet.models";
import { useQuery } from "@tanstack/react-query";

const USE_SDK = process.env.NEXT_PUBLIC_USE_SDK === "true";

export const getPortfolioByChain = (
  jwt: string,
  address: string,
  chains: SUPPORTED_CHAINS[]
) => {
  const { getPortfolioSdk } = useWalletInfraSdk();
  const { data } = useQuery({
    refetchInterval: 6000,
    queryKey: [`GetPortfolio-${chains}-${address}`],
    queryFn: async () => {
      const promises: Promise<IWalletPortfolio>[] = [];
      chains.forEach((chain) => {
        if (USE_SDK) {
          const promise = getPortfolioSdk(address, chain);
          promises.push(promise);
        } else {
          const promise = fetch(
            `${BASE_URL}/wallets/portfolio/${address}/${chain}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          ).then((res) => res.json());
          promises.push(promise);
        }
      });
      const walletPortfolios = await Promise.all(promises);
      const assets: {
        chainId: SUPPORTED_CHAINS;
        tokenId: string;
        balance: string;
        address?: string | undefined;
        decimals?: number | undefined;
        tokenPriceUsd?: string | undefined;
      }[] = [];
      walletPortfolios.forEach((walletPortfolio) => {
        walletPortfolio.portfolio.forEach((pf) => {
          assets.push({
            chainId: walletPortfolio.chainId as SUPPORTED_CHAINS,
            ...pf,
          });
        });
      });
      return assets;
    },
  });
  return data;
};
