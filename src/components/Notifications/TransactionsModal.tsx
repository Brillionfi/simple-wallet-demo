import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import { TEvmReceipt, TWalletActivity } from '@brillionfi/wallet-infra-sdk/dist/models';

export const TransactionsModal = ({
  open,
  handleClose,
  notification,
}: {
  open: boolean;
  handleClose: () => void;
  notification: TEvmReceipt;
}) => {
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
        <pre>{JSON.stringify(notification, undefined, 2)}</pre>
      </Sheet>
    </Modal>
  );
};
