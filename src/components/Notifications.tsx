import React, { useEffect, useState } from 'react';
import { TNotifications, WalletFormats } from '@brillionfi/wallet-infra-sdk/dist/models';
import { NotificationsTable } from './Notifications/NotificationsTable';
import { getChainsForFormat } from '@/utils/getChainsForFormat';
import { useWallet } from '@brillionfi/waas-react-sdk';

export function Notifications({ address, format }: { address?: string; format?: WalletFormats }) {
  const chains = getChainsForFormat(format);
  const { getNotifications } = useWallet();
  const [data, setData] = useState<TNotifications>();

  useEffect(() => {
    if(address && chains){
      for (const chain of chains) {
        getNotifications(address, chain).then((res) => {
          if(res){
            setData({notifications: {...res.notifications, ...data?.notifications}, transactions: {...res.transactions, ...data?.transactions}});
          } 
        });
      }
    }
  }, [])
  
  return (
    <div className="flex gap-5 flex-col w-full">
      {data && address && <>
        <div className="flex w-full justify-between items-end">
          <div>
            <h2 className="inline">Notifications</h2>
          </div>
        </div>
        <NotificationsTable notifications={data} eoa={address} />
      </>
      }
    </div>
  );
}
