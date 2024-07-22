import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useWalletInfraSdk } from '@/hooks/useWalletInfraSdk';
import { useState } from 'react';
import { Assets } from './PortfolioTable';
import { Typography } from '@mui/joy';
import { getChainNamesFromChainIds } from '@/utils/getChainNamesFromChainIds';
import { shorten } from '@/utils/shorten';
import { CopyHelper } from '../ui/copy';

export const SendTxModal = ({
  open,
  handleClose,
  account,
  asset,
}: {
  open: boolean;
  handleClose: () => void;
  account: string;
  asset: Assets
}) => {
  const [txTo, setTxTo] = useState<string>();
  const [txValue, setTxValue] = useState<number>();
  const [txHash, setTxHash] = useState<string>("");
  const { createTransactionSdk } = useWalletInfraSdk();

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
          maxWidth: 500,
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
          Sending {asset.tokenId} on {getChainNamesFromChainIds(asset.chainId)}
        </Typography>
        <div className='flex justify-center items-center'>
          <div className="flex">
            <Input
              placeholder={"Destination"}
              className="h-6 m-2 w-4/6 text-xs"
              type="text"
              value={txTo}
              onChange={(e) => setTxTo(e.target.value)}
            />
            <Input
              placeholder={"Value"}
              className="h-6 m-2 w-2/6 text-xs"
              type="number"
              min={1 / 10 ** Number(asset.decimals)}
              value={txValue}
              onChange={(e) =>
                setTxValue(
                  Math.min(
                    Number(asset.balance) /
                      10 ** Number(asset.decimals),
                    Number(e.target.value)
                  )
                )
              }
            />
          </div>
          <Button
            disabled={!txTo?.length || !txValue}
            variant={"destructive"}
            onClick={async () => {
              console.log(
                "Sending tx: ",
                account,
                txTo!,
                (txValue! * 10 ** asset.decimals!).toString(),
                "0x",
                asset.chainId
              );
              const tx = await createTransactionSdk(
                account,
                txTo!,
                (txValue! * 10 ** asset.decimals!).toString(),
                "0x",
                asset.chainId
              );
              setTxHash(tx.transactionHash ?? tx.transactionId);
            }}
            className="h-6"
          >
            Send
          </Button>
        </div>
        {txHash && 
          <div className='flex items-center justify-center'>
            TX hash:
            <CopyHelper
              clipboard={txHash}
              content={shorten(txHash, 10)}
            />
          </div>
        }
      </Sheet>
    </Modal>
  )
}