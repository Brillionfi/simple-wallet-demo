import type { IWallet } from "@brillionfi/wallet-infra-sdk";
import { CopyHelper } from "../ui/copy";
import { shorten } from "@/utils/shorten";

export const WalletsTable = ({
  wallets,
  account,
  setAccount,
  setChain,
}: {
  wallets: IWallet[];
  account?: string;
  setAccount: (address: string) => void;
  setChain: (address: string) => void;
}) => {
  const thStyle = "text-center font-normal border-slate-200 border py-2 px-3";
  const tdStyle = "px-3 border-slate-200 border";
  return (
    <table className="rounded-md overflow-hidden text-gray-500 border-solid border-slate-200 text-sm">
      <thead className="bg-slate-100">
        <tr>
          <th className={thStyle}>Owner</th>
          <th className={thStyle}>Format</th>
          <th className={thStyle}>Address</th>
          <th className={thStyle}>Name</th>
        </tr>
      </thead>
      <tbody>
        {wallets.map((wallet, index) => (
          <tr className={`bg-slate-50 bg-sl`} key={index}>
            <td className={`${tdStyle} w-1/12`}>{shorten(wallet.owner!, 8)}</td>
            <td className={`${tdStyle} w-1/12`}>{wallet.format}</td>
            <td className={`${tdStyle} w-1/12`}>
              <CopyHelper
                action={() => {
                  setAccount(wallet.address!);
                  setChain(wallet.format);
                }}
                selected={wallet.address === account}
                clipboard={wallet.address as string}
                content={shorten(wallet.address!, 5)}
              />
            </td>
            <td className={`${tdStyle}`}>
              <CopyHelper
                clipboard={wallet.name}
                content={shorten(wallet.name, 7)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
