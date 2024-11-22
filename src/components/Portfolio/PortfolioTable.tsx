
import { useState } from "react";
import { Button } from "../ui/button";
import { getChainNamesFromChainIds } from "@/utils/getChainNamesFromChainIds";
import React from "react";
import { WalletFormats, WalletTypes } from "@brillionfi/wallet-infra-sdk/dist/models/wallet.models";
import { SUPPORTED_CHAINS } from "@brillionfi/wallet-infra-sdk/dist/models/common.models";
import { SignTxModal } from "./SignTxModal";
import { SendTxModal } from "./SendTxModal";

export interface Assets {
  chainId: SUPPORTED_CHAINS;
  tokenId: string;
  balance: string;
  address?: string | undefined;
  decimals?: number | undefined;
  tokenPriceUsd?: string | undefined;
}

export function PortfolioTable({
  assets,
  account,
  format,
  walletType,
}: {
  assets: Assets[];
  account: string;
  format: WalletFormats;
  walletType: WalletTypes;
}) {
  const [showSignTxModal, setShowSignTxModal] = useState<boolean>(false);
  const [selectedChain, setSelectedChain] = useState<SUPPORTED_CHAINS | undefined>();

  const [showSendTxModal, setShowSendTxModal] = useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<Assets>();

  const openSignTxModal = (chain: SUPPORTED_CHAINS) => {
    setSelectedChain(chain)
    setShowSignTxModal(true);
  }

  const closeSignTxModal = () => {
    setSelectedChain(undefined)
    setShowSignTxModal(false);
  }

  const openSendTxModal = (asset: Assets) => {
    if(Number(asset.balance) > 0) {
      setSelectedAsset(asset)
      setShowSendTxModal(true)
    }
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
          <th className={thStyle}>Chain</th>
          <th className={thStyle}>Token</th>
          <th className={thStyle}>Balance</th>
          <th className={thStyle}>Price</th>
          <th className={thStyle}>Send</th>
          <th className={thStyle}>Sign TX</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset, index) => (
          <React.Fragment key={index}>
            <tr
              className={`bg-slate-50 bg-sl transition-all`}
              key={`${asset.chainId}:${asset.tokenId}-1-${index}`}
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
                    openSendTxModal(asset)
                  }
                  disabled={Number(asset.balance) === 0}
                  className="h-7 m-1"
                >
                  Send
                </Button>
              </td>
              <td className={`${tdStyle} text-center w-1/5`}>
                <Button
                  onClick={()=>openSignTxModal(asset.chainId)}
                  className="h-7 m-1"
                >
                  Sign
                </Button>
              </td>
            </tr>
          </React.Fragment>
        ))}
        {selectedChain && <SignTxModal open={showSignTxModal} handleClose={closeSignTxModal} chain={selectedChain} account={account} format={format} walletType={walletType}/>}
        {selectedAsset && <SendTxModal open={showSendTxModal} handleClose={closeSendTxModal} account={account} asset={selectedAsset}/>}
      </tbody>
    </table>
  );
}
