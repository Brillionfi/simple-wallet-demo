import { getWalletNotifications } from '@/lib/getWalletNotifications';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { SUPPORTED_CHAINS, TNotifications, WalletFormats } from '@brillionfi/wallet-infra-sdk/dist/models';
import { NotificationsTable } from './Notifications/NotificationsTable';
import { getChainsForFormat } from '@/utils/getChainsForFormat';

export function Notifications({ jwt, address, format }: { jwt: string; address?: string; format?: WalletFormats }) {
  const chains = getChainsForFormat(format);
  const notifications: TNotifications | undefined = getWalletNotifications(jwt, chains, address);

  return (
    <div className="flex gap-5 flex-col w-full">
      <div className="flex w-full justify-between items-end">
        <div>
          <h2 className="inline">Notifications</h2>
        </div>
      </div>
      {notifications ? <NotificationsTable notifications={notifications} /> : <CircularProgress size={15} />}
    </div>
  );
}
