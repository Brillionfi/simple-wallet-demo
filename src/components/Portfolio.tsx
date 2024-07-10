import { getPortfolio } from "@/lib/getPortfolio";
import { getChain } from "@/utils/getChain";

export function Portfolio({
  account,
  chainId,
  jwt,
}: {
  jwt: string;
  account: string;
  chainId: string;
}) {
  const chain = getChain(chainId);
  const portfolio = getPortfolio(jwt, account, chain);
  console.log(portfolio);
  return (
    <div className="flex gap-5 flex-col w-full">
      <div className="flex w-full justify-between items-end">
        <div>
          <h2 className="inline">Portfolio</h2>
          <i className="text-xs"> - ({account})</i>
        </div>
      </div>
    </div>
  );
}
