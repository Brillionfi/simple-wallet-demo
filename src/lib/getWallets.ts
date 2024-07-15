import { B2B_API_URL } from "@/utils/constants";
import type { TWallet } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export const getWallets = (jwt: string) => {
  const { data } = useQuery({
    refetchInterval: 6000,
    queryKey: ["GetWalletsList"],
    queryFn: async () => {
      const response = await fetch(`${B2B_API_URL}/wallets`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const answer = await response.json();
      const wallets = answer as TWallet[];
      return wallets;
    },
  });
  return data;
};
