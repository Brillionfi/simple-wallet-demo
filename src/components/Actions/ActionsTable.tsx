
import { Button } from "../ui/button";
import React, { useState } from "react";
import { ActionModal } from "./ActionModal";

export interface Notification {
  id: string,
  fingerprint: string,
  organizationId: string,
  type: string,
  status: string,
  eoa: string,
  createdAt: string,
  updatedAt: string,
  canApprove: boolean,
  canReject: boolean,
  votes: object[],
  intent: object,
  result: object | undefined,
  notificationLevel: string,
  notificationStatus: string,
}

export function ActionsTable({
  notifications,
}: {
  notifications: Notification[];
}) {
  const [showActionModal, setShowActionModal] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<Notification>();

  const openActionModal = (asset: Notification) => {
    setSelectedAction(asset)
    setShowActionModal(true)
  }

  const closeActionModal = () => {
    setSelectedAction(undefined)
    setShowActionModal(false);
  }

  const thStyle = "text-center font-normal border-slate-200 border py-2 px-3";
  const tdStyle = "px-3 border-slate-200 border";

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
        {notifications.map((action, index) => {
          const type = action.type.startsWith("ACTIVITY_TYPE_") ? action.type.split("ACTIVITY_TYPE_")[1] : action.type
          const status = action.status.startsWith("ACTIVITY_STATUS_") ? action.status.split("ACTIVITY_STATUS_")[1] : action.status
          const statusColor = status === "COMPLETED" ? "text-teal-500" : status === "CONSENSUS_NEEDED" ? "text-amber-500" : "text-rose-500" ;
          return (
            <React.Fragment key={index}>
              <tr
                className={`bg-slate-50 bg-sl transition-all`}
              >
                <td className={`${tdStyle} text-center w-1/6`}>
                  {action.id}
                </td>
                <td className={`${tdStyle} text-center w-1/4`}>
                  {type}
                </td>
                <td className={`${tdStyle} text-center w-1/5 ${statusColor}`}>
                  {status}
                </td>
                <td className={`${tdStyle} text-center w-1/5`}>
                  <Button
                    className="h-7 m-1"
                    onClick={() =>
                      openActionModal(action)
                    }
                  >
                    View more
                  </Button>
                </td>
              </tr>
            </React.Fragment>
          )}
        )}
        {selectedAction && <ActionModal open={showActionModal} handleClose={closeActionModal} action={selectedAction}/>}
      </tbody>
    </table>
  );
}
