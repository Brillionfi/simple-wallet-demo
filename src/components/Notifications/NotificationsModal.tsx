import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import { Button } from '../ui/button';
import { Typography } from '@mui/joy';
import { useWalletInfraSdk } from '@/hooks/useWalletInfraSdk';
import { TWalletActivity } from '@brillionfi/wallet-infra-sdk/dist/models';

export const NotificationsModal = ({
  open,
  handleClose,
  notification,
  eoa,
}: {
  open: boolean;
  handleClose: () => void;
  notification: TWalletActivity;
  eoa: string;
}) => {
  const { approveTransaction, rejectTransaction } = useWalletInfraSdk();
  const type = notification.type.startsWith('ACTIVITY_TYPE_')
    ? notification.type.split('ACTIVITY_TYPE_')[1]
    : notification.type;
  const status = notification.status.startsWith('ACTIVITY_STATUS_')
    ? notification.status.split('ACTIVITY_STATUS_')[1]
    : notification.status;
  const data = notification.intent[Object.keys(notification.intent)[0]];
  const result = notification.result ? (notification.result as any)[Object.keys(notification.result)[0]] : null;
  const tdStyle = 'p-3 border-slate-200 border break-all';
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet
        variant="outlined"
        sx={{
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
          paddingTop: '50px',
          width: '80%',
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />

        <Typography component="h2" id="modal-title" level="h4" textColor="inherit" fontWeight="lg" mb={1}>
          <table className="rounded-md overflow-hidden text-gray-500 border-solid border-slate-200 text-sm relative">
            <tbody>
              <tr className={`bg-slate-50 bg-sl transition-all`}>
                <td className={`${tdStyle} text-center w-1/6`}>Created At</td>
                <td className={`${tdStyle} text-center w-1/4`}>
                  {new Date(Number(notification.createdAt)).toUTCString()}
                </td>
              </tr>
              <tr className={`bg-slate-50 bg-sl transition-all`}>
                <td className={`${tdStyle} text-center w-1/6`}>ID</td>
                <td className={`${tdStyle} text-center w-1/4`}>{notification.id}</td>
              </tr>
              <tr className={`bg-slate-50 bg-sl transition-all`}>
                <td className={`${tdStyle} text-center w-1/6`}>Wallet</td>
                <td className={`${tdStyle} text-center w-1/4`}>{eoa}</td>
              </tr>
              <tr className={`bg-slate-50 bg-sl transition-all`}>
                <td className={`${tdStyle} text-center w-1/6`}>Type</td>
                <td className={`${tdStyle} text-center w-1/4`}>{type}</td>
              </tr>
              <tr className={`bg-slate-50 bg-sl transition-all`}>
                <td className={`${tdStyle} text-center w-1/6`}>Status</td>
                <td className={`${tdStyle} text-center w-1/4`}>{status}</td>
              </tr>
              <tr className={`bg-slate-50 bg-sl transition-all`}>
                <td className={`${tdStyle} text-center w-1/6`}>Data</td>
                <td className={`${tdStyle} text-center w-1/4`}>
                  {typeof data === 'object' &&
                    data !== null &&
                    Object.keys(data).map((key: string, index) => {
                      return (
                        <p key={index}>
                          {key}: {(data as Record<string, any>)[key]}
                        </p>
                      );
                    })}
                </td>
              </tr>
              {result && (
                <tr className={`bg-slate-50 bg-sl transition-all`}>
                  <td className={`${tdStyle} text-center w-1/6`}>Result</td>
                  <td className={`${tdStyle} text-center w-1/4`}>
                    {Object.keys(result).map((key, index) => {
                      return (
                        <p key={index}>
                          {key}: {result[key]}
                        </p>
                      );
                    })}
                  </td>
                </tr>
              )}
              <tr className={`bg-slate-50 bg-sl transition-all`}>
                <td className={`${tdStyle} text-center w-1/6`}>Votes</td>
                <td className={`${tdStyle} text-center w-1/4`}>
                  <table className="rounded-md overflow-hidden text-gray-500 border-solid border-slate-200 text-sm relative">
                    <tbody>
                      {notification.votes?.map((vote, index) => {
                        const decision = (vote as any).selection.includes('VOTE_SELECTION_')
                          ? (vote as any).selection.split('VOTE_SELECTION_')[1]
                          : (vote as any).selection;
                        const decisionColor = !decision.toLowerCase().includes('approved')
                          ? 'text-rose-500'
                          : 'text-teal-500';
                        return (
                          <tr key={index} className={`bg-slate-50 bg-sl transition-all`}>
                            <td className={`${tdStyle} text-center w-1/4`}>{(vote as any).user.userName}</td>
                            <td className={`${tdStyle} text-center w-1/4`}>{(vote as any).user.userEmail}</td>
                            <td className={`${tdStyle} ${decisionColor} text-center w-1/4`}>{decision}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </Typography>

        {status === 'CONSENSUS_NEEDED' && (
          <div className="flex justify-around items-center ">
            <Button
              onClick={() => {
                const notif = notification as TWalletActivity;
                approveTransaction(eoa, notif.organizationId, notif.fingerprint);
              }}
            >
              Approve
            </Button>
            <Button
              onClick={() => {
                const notif = notification as TWalletActivity;
                rejectTransaction(eoa, notif.organizationId, notif.fingerprint);
              }}
              variant={'destructive'}
            >
              Reject
            </Button>
          </div>
        )}
      </Sheet>
    </Modal>
  );
};
