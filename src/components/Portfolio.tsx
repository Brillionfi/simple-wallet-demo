import { getChainsForFormat } from "@/utils/getChainsForFormat";
import React, { useEffect, useMemo, useState } from "react";
import { WalletFormats, WalletTypes } from "@brillionfi/wallet-infra-sdk/dist/models/wallet.models";
import { Assets, PortfolioTable } from "./Portfolio/PortfolioTable";
import CircularProgress from '@mui/material/CircularProgress';
import { useBalance } from "@brillionfi/waas-react-sdk";

export function Portfolio({
  account,
  format,
  walletType,
}: {
  account: string;
  format: WalletFormats;
  walletType: WalletTypes;
}) {
  const chains = getChainsForFormat(format);
  const { getPortfolio }= useBalance();
  const [portfolio, setPortfolio] = useState<Assets[]>();

  useEffect(() => {
    const getData = async () => {
      const promises = [];
      if(account && chains){
        for (const chain of chains) {
          promises.push(getPortfolio(account, chain));
        }
      }
      const results = await Promise.all(promises);
      const portfolios:Assets[] = [];
      results.forEach(result => {
        result?.portfolio.forEach(element => {
          portfolios.push({...element, chainId: result.chainId});
        });
      }); 
      if(portfolios.length > 0) setPortfolio(portfolios);
    }
    void getData();
  }, [])

  return (
    <div className="flex gap-5 flex-col w-full">
      <div className="flex w-full justify-between items-end">
        <div>
          <h2 className="inline">Portfolio</h2>
          <i className="text-xs"> - ({account})</i>
        </div>
      </div>
      {portfolio ? 
        <PortfolioTable assets={portfolio} account={account} format={format} walletType={walletType} />
      :
        <CircularProgress size={15}/>
      }
    </div>
  );
}