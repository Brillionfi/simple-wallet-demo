
import { getPortfolioByChain } from "@/lib/getPortfolioByChain";
import { getChainsForFormat } from "@/utils/getChainsForFormat";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useWalletInfraSdk } from "@/hooks/useWalletInfraSdk";
import { getChainNamesFromChainIds } from "@/utils/getChainNamesFromChainIds";
import React from "react";
import { WalletFormats, WalletTypes } from "@brillionfi/wallet-infra-sdk/dist/models/wallet.models";
import { PortfolioTable } from "./Portfolio/PortfolioTable";

export function Portfolio({
  account,
  format,
  walletType,
  jwt,
}: {
  jwt: string;
  account: string;
  format: WalletFormats;
  walletType: WalletTypes;
}) {
  const chains = getChainsForFormat(format);
  const assets = getPortfolioByChain(jwt, account, chains);

  return (
    <div className="flex gap-5 flex-col w-full">
      <div className="flex w-full justify-between items-end">
        <div>
          <h2 className="inline">Portfolio</h2>
          <i className="text-xs"> - ({account})</i>
        </div>
      </div>
      {assets && <PortfolioTable assets={assets} account={account} format={format} walletType={walletType} />}
    </div>
  );
}
