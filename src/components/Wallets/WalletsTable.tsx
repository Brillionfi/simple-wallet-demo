import { CopyHelper } from "../ui/copy";
import { TWallet } from "@/utils/types";

export const WalletsTable = ({ wallets }: { wallets: TWallet[] }) => {
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
            <td className={`${tdStyle}`}>{wallet.owner}</td>
            <td className={`${tdStyle} w-1/12`}>{wallet.format}</td>
            <td className={`${tdStyle} w-1/12`}>
              <CopyHelper
                clipboard={wallet.address}
                content={`${wallet.address.slice(
                  0,
                  6
                )}...${wallet.address.slice(
                  wallet.address.length - 4,
                  wallet.address.length
                )}`}
              />
            </td>
            <td className={`${tdStyle} w-1/12`}>
              <CopyHelper
                clipboard={wallet.name}
                content={`${wallet.name.slice(0, 4)}...${wallet.name.slice(
                  wallet.name.length - 4,
                  wallet.name.length
                )}`}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
