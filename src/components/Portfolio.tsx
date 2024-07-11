import { getPortfolioByChain } from "@/lib/getPortfolioByChain";
import { getChainsForFormat } from "@/utils/getChainsForFormat";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useWalletInfraSdk } from "@/hooks/useWalletInfraSdk";
import { getChainNamesFromChainIds } from "@/utils/getChainNamesFromChainIds";

export function Portfolio({
  account,
  format,
  jwt,
}: {
  jwt: string;
  account: string;
  format: string;
}) {
  const [txRow, setTxRow] = useState<number>();
  const [txTo, setTxTo] = useState<string>();
  const [txValue, setTxValue] = useState<number>();
  const chains = getChainsForFormat(format);
  const assets = getPortfolioByChain(jwt, account, chains);
  const { createTransactionSdk } = useWalletInfraSdk();
  const thStyle = "text-center font-normal border-slate-200 border py-2 px-3";
  const tdStyle = "px-3 border-slate-200 border";
  return (
    <div className="flex gap-5 flex-col w-full">
      <div className="flex w-full justify-between items-end">
        <div>
          <h2 className="inline">Portfolio</h2>
          <i className="text-xs"> - ({account})</i>
        </div>
      </div>

      {assets && (
        <table className="rounded-md overflow-hidden text-gray-500 border-solid border-slate-200 text-sm relative">
          <thead className="bg-slate-100">
            <tr>
              <th className={thStyle}>Chain</th>
              <th className={thStyle}>Token</th>
              <th className={thStyle}>Balance</th>
              <th className={thStyle}>Price</th>
              <th className={thStyle}>Send</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <>
                <tr
                  className={`bg-slate-50 bg-sl transition-all ${
                    txRow && txRow < index ? `mt-[${index * 40}px]` : ""
                  }`}
                  key={`${asset.chainId}:${asset.tokenId}-1`}
                >
                  <td className={`${tdStyle} w-1/6`}>
                    {getChainNamesFromChainIds(asset.chainId)}
                  </td>
                  <td className={`${tdStyle} w-1/12`}>{asset.tokenId}</td>
                  <td className={`${tdStyle} w-1/6 text-right`}>
                    {Number(asset.balance) / 10 ** Number(asset.decimals)}
                  </td>
                  <td className={`${tdStyle} w-1/4 text-right`}>{`${Number(
                    asset.tokenPriceUsd
                  ).toFixed(1)}US$/${asset.tokenId}`}</td>
                  <td className={`${tdStyle} text-center w-1/5`}>
                    <Button
                      onClick={() =>
                        Number(asset.balance) > 0 &&
                        setTxRow(txRow === index ? undefined : index)
                      }
                      disabled={Number(asset.balance) === 0}
                      className="h-7 m-1"
                    >
                      {txRow === index ? "Close" : "Send"}
                    </Button>
                  </td>
                </tr>
                <tr
                  key={`${asset.chainId}:${asset.tokenId}-2`}
                  className="h-0 absolute w-full"
                >
                  <td
                    className={`flex items-center bg-slate-100 transition-all absolute w-full overflow-hidden justify-between pr-8 ${
                      txRow === index ? "h-[39px]" : "h-0"
                    }`}
                    colSpan={5}
                  >
                    <div className="flex">
                      <Input
                        placeholder={"Destination"}
                        className="h-6 m-2 w-[330px] text-xs"
                        type="text"
                        value={txTo}
                        onChange={(e) => setTxTo(e.target.value)}
                      />
                      <Input
                        placeholder={"Value"}
                        className="h-6 m-2 w-28 text-xs"
                        type="number"
                        min={1 / 10 ** Number(asset.decimals)}
                        value={txValue}
                        onChange={(e) =>
                          setTxValue(
                            Math.min(
                              Number(asset.balance) /
                                10 ** Number(asset.decimals),
                              Number(e.target.value)
                            )
                          )
                        }
                      />
                    </div>
                    <Button
                      disabled={!txTo?.length || !txValue}
                      onClick={async () => {
                        console.log(
                          "Sending tx: ",
                          account,
                          txTo!,
                          (txValue! * 10 ** asset.decimals!).toString(),
                          "0x",
                          asset.chainId
                        );
                        const tx = await createTransactionSdk(
                          account,
                          txTo!,
                          (txValue! * 10 ** asset.decimals!).toString(),
                          "0x",
                          asset.chainId
                        );
                        console.log(tx);
                      }}
                      className="h-6"
                    >
                      Send
                    </Button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
