import { AssetsTable, useBrillionContext } from "@brillionfi/waas-react-sdk";
import { PortfolioTable } from "./Portfolio/PortfolioTable";

export function Portfolio({
  account,
}: {
  account: string;
}) {
  const { chain } = useBrillionContext();

  return (
    <div className="flex gap-5 flex-col w-full">
      <AssetsTable address={account}/>
      <div className="flex w-full justify-between items-end">
        <div>
          <h2 className="inline">Portfolio</h2>
          <i className="text-xs"> - ({account}) - ChainId: {chain}</i>
        </div>
      </div>
      <PortfolioTable />
    </div>
  );
}