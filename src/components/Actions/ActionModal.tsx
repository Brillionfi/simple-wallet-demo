import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import { Button } from "../ui/button";
import { Notification } from './ActionsTable';
import { Typography } from '@mui/joy';
import { useWalletInfraSdk } from '@/hooks/useWalletInfraSdk';

export const ActionModal = ({
  open,
  handleClose,
  action,
}: {
  open: boolean;
  handleClose: () => void;
  action: Notification
}) => {
  const {approveActivity, rejectActivity} = useWalletInfraSdk();
  const type = action.type.startsWith("ACTIVITY_TYPE_") ? action.type.split("ACTIVITY_TYPE_")[1] : action.type
  const status = action.status.startsWith("ACTIVITY_STATUS_") ? action.status.split("ACTIVITY_STATUS_")[1] : action.status
  const data = (action.intent as any)[Object.keys(action.intent)[0]]
  const result = action.result ? (action.result as any)[Object.keys(action.result)[0]] : null
  const tdStyle = "p-3 border-slate-200 border break-all";
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
    >
      <Sheet
        variant="outlined"
        sx={{
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
          paddingTop: '50px',
          width: '80%'
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          <table className="rounded-md overflow-hidden text-gray-500 border-solid border-slate-200 text-sm relative">
            <tbody>
              <tr
                className={`bg-slate-50 bg-sl transition-all`}
              >
                <td className={`${tdStyle} text-center w-1/6`}>
                  Created At
                </td>
                <td className={`${tdStyle} text-center w-1/4`}>
                  {new Date(Number(action.createdAt)).toUTCString()}
                </td>
              </tr>
              <tr
                className={`bg-slate-50 bg-sl transition-all`}
              >
                <td className={`${tdStyle} text-center w-1/6`}>
                  ID
                </td>
                <td className={`${tdStyle} text-center w-1/4`}>
                  {action.id}
                </td>
              </tr>
              <tr
                className={`bg-slate-50 bg-sl transition-all`}
              >
                <td className={`${tdStyle} text-center w-1/6`}>
                  Wallet
                </td>
                <td className={`${tdStyle} text-center w-1/4`}>
                  {action.eoa}
                </td>
              </tr>
              <tr
                className={`bg-slate-50 bg-sl transition-all`}
              >
                <td className={`${tdStyle} text-center w-1/6`}>
                  Type
                </td>
                <td className={`${tdStyle} text-center w-1/4`}>
                  {type}
                </td>
              </tr>
              <tr
                className={`bg-slate-50 bg-sl transition-all`}
              >
                <td className={`${tdStyle} text-center w-1/6`}>
                  Status
                </td>
                <td className={`${tdStyle} text-center w-1/4`}>
                  {status}
                </td>
              </tr>
              <tr
                className={`bg-slate-50 bg-sl transition-all`}
              >
                <td className={`${tdStyle} text-center w-1/6`}>
                  Data
                </td>
                <td className={`${tdStyle} text-center w-1/4`}>
                  {Object.keys(data).map((key, index) => {
                    return (
                      <p key={index}>
                        {key}: {data[key]}
                      </p>
                    )
                  })}
                </td>
              </tr>
              {result && 
                <tr
                  className={`bg-slate-50 bg-sl transition-all`}
                >
                  <td className={`${tdStyle} text-center w-1/6`}>
                    Result
                  </td>
                  <td className={`${tdStyle} text-center w-1/4`}>
                    {Object.keys(result).map((key, index) => {
                      return (
                        <p key={index}>
                          {key}: {result[key]}
                        </p>
                      )
                    })}
                  </td>
                </tr>
              }
              <tr
                className={`bg-slate-50 bg-sl transition-all`}
              >
                <td className={`${tdStyle} text-center w-1/6`}>
                Votes
                </td>
                <td className={`${tdStyle} text-center w-1/4`}>
                  <table className="rounded-md overflow-hidden text-gray-500 border-solid border-slate-200 text-sm relative">
                    <tbody>
                      {action.votes.map((vote, index) => {
                        const decision = (vote as any).selection.includes("VOTE_SELECTION_") ? (vote as any).selection.split("VOTE_SELECTION_")[1] : (vote as any).selection;
                        const decisionColor = !decision.toLowerCase().includes("approved") ? "text-rose-500" : "text-teal-500";
                        return (
                              <tr
                                key={index} 
                                className={`bg-slate-50 bg-sl transition-all`}
                              >
                                <td className={`${tdStyle} text-center w-1/4`}>
                                  {(vote as any).user.userName}
                                </td>
                                <td className={`${tdStyle} text-center w-1/4`}>
                                  {(vote as any).user.userEmail}
                                </td>
                                <td className={`${tdStyle} ${decisionColor} text-center w-1/4`}>
                                  {decision}
                                </td>
                              </tr>
                        )}
                      )}
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          
        </Typography>
        {status === "CONSENSUS_NEEDED" && 
          <div className='flex justify-around items-center '>
            <Button
              onClick={() => {
                approveActivity(action.organizationId, action.fingerprint)
              }}
            >
              Approve
            </Button>
            <Button
              onClick={() => {
                rejectActivity(action.organizationId, action.fingerprint)
              }}
              variant={"destructive"}
            >
              Reject
            </Button>
          </div>
        }
      </Sheet>
    </Modal>
  )
}