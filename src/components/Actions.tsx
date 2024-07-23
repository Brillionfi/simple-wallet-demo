
import { getWalletActions } from "@/lib/getWalletActions";
import React from "react";
import { ActionsTable } from "./Actions/ActionsTable";
import { Notification } from './Actions/ActionsTable';
import CircularProgress from '@mui/material/CircularProgress';

export function Actions({
  account,
  jwt,
}: {
  account: string;
  jwt: string;
}) {
  const notifications: Notification[] = getWalletActions(jwt, account);

  return (
    <div className="flex gap-5 flex-col w-full">
      <div className="flex w-full justify-between items-end">
        <div>
          <h2 className="inline">Actions</h2>
          <i className="text-xs"> - ({account})</i>
        </div>
      </div>
      {notifications ? 
        <ActionsTable notifications={notifications} /> 
      : 
        <CircularProgress size={15}/>
      }
    </div>
  );
}
