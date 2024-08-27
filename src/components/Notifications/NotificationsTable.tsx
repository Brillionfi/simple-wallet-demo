import { Button } from '../ui/button';
import React, { useState } from 'react';
import { NotificationsModal } from './NotificationsModel';
import { TEvmReceipt, TNotifications, TWalletActivity } from '@brillionfi/wallet-infra-sdk/dist/models';

export function NotificationsTable({ notifications }: { notifications: TNotifications }) {
  const [showActionModal, setShowActionModal] = useState<boolean>(false);
  const [selectedNotif, setSelectedAction] = useState<TEvmReceipt | TWalletActivity>();

  const openActionModal = (asset: TEvmReceipt | TWalletActivity) => {
    setSelectedAction(asset);
    setShowActionModal(true);
  };

  const closeActionModal = () => {
    setSelectedAction(undefined);
    setShowActionModal(false);
  };

  const thStyle = 'text-center font-normal border-slate-200 border py-2 px-3';
  const tdStyle = 'px-3 border-slate-200 border';

  return (
    <table className="rounded-md overflow-hidden text-gray-500 border-solid border-slate-200 text-sm relative">
      <thead className="bg-slate-100">
        <tr>
          <th className={thStyle}>ID</th>
          <th className={thStyle}>Type</th>
          <th className={thStyle}>Status</th>
          <th className={thStyle}>Action</th>
        </tr>
      </thead>
      <tbody>
        {notifications.transactions.map((notif, index) => {
          const type = notif.type.startsWith('ACTIVITY_TYPE_') ? notif.type.split('ACTIVITY_TYPE_')[1] : notif.type;
          const status = notif.status.startsWith('ACTIVITY_STATUS_')
            ? notif.status.split('ACTIVITY_STATUS_')[1]
            : notif.status;
          const statusColor =
            status === 'COMPLETED'
              ? 'text-teal-500'
              : status === 'CONSENSUS_NEEDED'
                ? 'text-amber-500'
                : 'text-rose-500';
          return (
            <React.Fragment key={index}>
              <tr className={`bg-slate-50 bg-sl transition-all`}>
                <td className={`${tdStyle} text-center w-1/6`}>{notif.blockHash}</td>
                <td className={`${tdStyle} text-center w-1/4`}>{type}</td>
                <td className={`${tdStyle} text-center w-1/5 ${statusColor}`}>{status}</td>
                <td className={`${tdStyle} text-center w-1/5`}>
                  <Button className="h-7 m-1" onClick={() => openActionModal(notif)}>
                    View more
                  </Button>
                </td>
              </tr>
            </React.Fragment>
          );
        })}
        {notifications.notifications.map((notif, index) => {
          const type = notif.type.startsWith('ACTIVITY_TYPE_') ? notif.type.split('ACTIVITY_TYPE_')[1] : notif.type;
          const status = notif.status.startsWith('ACTIVITY_STATUS_')
            ? notif.status.split('ACTIVITY_STATUS_')[1]
            : notif.status;
          const statusColor =
            status === 'COMPLETED'
              ? 'text-teal-500'
              : status === 'CONSENSUS_NEEDED'
                ? 'text-amber-500'
                : 'text-rose-500';
          return (
            <React.Fragment key={index}>
              <tr className={`bg-slate-50 bg-sl transition-all`}>
                <td className={`${tdStyle} text-center w-1/6`}>{notif.id}</td>
                <td className={`${tdStyle} text-center w-1/4`}>{type}</td>
                <td className={`${tdStyle} text-center w-1/5 ${statusColor}`}>{status}</td>
                <td className={`${tdStyle} text-center w-1/5`}>
                  <Button className="h-7 m-1" onClick={() => openActionModal(notif)}>
                    View more
                  </Button>
                </td>
              </tr>
            </React.Fragment>
          );
        })}
        {selectedNotif && (
          <NotificationsModal open={showActionModal} handleClose={closeActionModal} notification={selectedNotif} />
        )}
      </tbody>
    </table>
  );
}
