import React, { useEffect, useState } from 'react';
import { TNotifications } from '@brillionfi/wallet-infra-sdk/dist/models';
import { NotificationsTable } from './Notifications/NotificationsTable';
import { useBrillionContext, useWallet } from '@brillionfi/waas-react-sdk';

export function Notifications() {
  const { wallet, chain } = useBrillionContext();
  const { getNotifications } = useWallet();
  const [data, setData] = useState<TNotifications>();

  useEffect(() => {
    getNotifications(wallet, chain).then((res) => {
      setData(res)
    });
  }, [])
  
  return (
    <div className="flex gap-5 flex-col w-full">
      {data && wallet && <>
        <div className="flex w-full justify-between items-end">
          <div>
            <h2 className="inline">Notifications</h2>
          </div>
        </div>
        <NotificationsTable notifications={data} eoa={wallet} />
      </>
      }
    </div>
  );
}
