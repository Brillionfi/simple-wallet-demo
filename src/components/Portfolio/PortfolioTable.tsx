
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import React from "react";
import { SignTxModal } from "./SignTxModal";
import { SendTxModal } from "./SendTxModal";
import { useBalance, useBrillionContext } from "@brillionfi/waas-react-sdk";

export interface Asset {
  tokenId: string;
  balance: string;
  address?: string | undefined;
  decimals?: number | undefined;
  tokenPriceUsd?: string | undefined;
}

export function PortfolioTable() {
  const { wallet, chain } = useBrillionContext();
  const { getBalances } = useBalance();
  const [showSignTxModal, setShowSignTxModal] = useState<boolean>(false);

  const [showSendTxModal, setShowSendTxModal] = useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset>();
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    getBalances(wallet, chain).then(args => {
      setAssets(args);
    });
  }, [])

  const openSignTxModal = () => {
    setShowSignTxModal(true);
  }

  const closeSignTxModal = () => {
    setShowSignTxModal(false);
  }

  const openSendTxModal = (asset: Asset) => {
    setSelectedAsset(asset)
    setShowSendTxModal(true)
  }

  const closeSendTxModal = () => {
    setSelectedAsset(undefined)
    setShowSendTxModal(false);
  }

  const thStyle = "text-center font-normal border-slate-200 border py-2 px-3";
  const tdStyle = "px-3 border-slate-200 border";
  return (
    <table className="rounded-md overflow-hidden text-gray-500 border-solid border-slate-200 text-sm relative">
      <thead className="bg-slate-100">
        <tr>
          <th className={thStyle}>Token</th>
          <th className={thStyle}>Balance</th>
          <th className={thStyle}>Price</th>
          <th className={thStyle}>Send</th>
          <th className={thStyle}>Sign TX</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset, index) => (
          <React.Fragment key={`token-${index}`}>
            <tr
              className={`bg-slate-50 bg-sl transition-all`}
              key={`${asset.tokenId}-1-${index}`}
            >
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
                    openSendTxModal(asset)
                  }
                  className="h-7 m-1"
                >
                  Send
                </Button>
              </td>
              <td className={`${tdStyle} text-center w-1/5`}>
                <Button
                  onClick={openSignTxModal}
                  className="h-7 m-1"
                >
                  Sign
                </Button>
              </td>
            </tr>
          </React.Fragment>
        ))}
        <SignTxModal open={showSignTxModal} handleClose={closeSignTxModal} />
        {selectedAsset && <SendTxModal open={showSendTxModal} handleClose={closeSendTxModal} asset={selectedAsset}/>}
      </tbody>
    </table>
  );
}
