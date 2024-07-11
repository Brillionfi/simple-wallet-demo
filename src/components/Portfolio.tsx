import { getPortfolioByChain } from "@/lib/getPortfolioByChain";
import { send } from "@/lib/send";
import { getChainsForFormat } from "@/utils/getChainsForFormat";

export function Portfolio({
  account,
  format,
  jwt,
}: {
  jwt: string;
  account: string;
  format: string;
}) {
  const chains = getChainsForFormat(format);
  const assets = getPortfolioByChain(jwt, account, chains);
  const thStyle = "text-center font-normal border-slate-200 border py-2 px-3";
  const tdStyle = "px-3 border-slate-200 border py-2";
  // const sendToken = () => void send();
  return (
    <div className="flex gap-5 flex-col w-full">
      <div className="flex w-full justify-between items-end">
        <div>
          <h2 className="inline">Portfolio</h2>
          <i className="text-xs"> - ({account})</i>
        </div>
      </div>

      {assets && (
        <table className="rounded-md overflow-hidden text-gray-500 border-solid border-slate-200 text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className={thStyle}>Chain</th>
              <th className={thStyle}>Token</th>
              <th className={thStyle}>Balance</th>
              <th className={thStyle}>Price</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr
                className={`bg-slate-50 bg-sl`}
                key={`${asset.chainId}:${asset.tokenId}`}
                // onClick={sendToken}
              >
                <td className={`${tdStyle} w-1/12`}>{asset.chainId}</td>
                <td className={`${tdStyle} w-1/12`}>{asset.tokenId}</td>
                <td className={`${tdStyle} text-center`}>
                  {Number(asset.balance) / 10 ** Number(asset.decimals)}
                </td>
                <td className={`${tdStyle} text-right`}>{`${Number(
                  asset.tokenPriceUsd
                ).toFixed(3)} US$/${asset.tokenId}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
