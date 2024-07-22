import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useWalletInfraSdk } from '@/hooks/useWalletInfraSdk';
import { WalletFormats, WalletTypes } from '@brillionfi/wallet-infra-sdk/dist/models/wallet.models';
import { SUPPORTED_CHAINS } from '@brillionfi/wallet-infra-sdk/dist/models/common.models';
import { getChainNamesFromChainIds } from '@/utils/getChainNamesFromChainIds';
import { CopyHelper } from '../ui/copy';
import { shorten } from '@/utils/shorten';

export const SignTxModal = ({
  open,
  handleClose,
  chain,
  account,
  format,
  walletType,
}: {
  open: boolean;
  handleClose: () => void;
  chain: SUPPORTED_CHAINS;
  account: string;
  format: WalletFormats;
  walletType: WalletTypes;
}) => {
  const [rawTx, setRawTx] = React.useState<string>("");
  const [signedTx, setSignedTx] = React.useState<string>("");
  const { signTransaction } = useWalletInfraSdk();
  const title = getChainNamesFromChainIds(chain || SUPPORTED_CHAINS.ETHEREUM);

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
          Signing for {title}
        </Typography>
        <div className='flex justify-center items-center'>
          <div className="flex">
            <Input
              placeholder={"Unsigned TX"}
              className="h-6 m-2 w-[330px] text-xs"
              type="text"
              value={rawTx}
              onChange={(e) => setRawTx(e.target.value)}
            />
          </div>
          <Button
            disabled={!rawTx.length}
            variant={"destructive"}
            onClick={async () => {
              console.log(
                "Signing tx: ", rawTx
              );
              let toSign = rawTx;
              if(toSign?.startsWith("0x")) toSign = toSign.substring(2);

              const signedTx = await signTransaction(
                account,
                walletType,
                format,
                toSign!,
              );

              setSignedTx(signedTx)
            }}
            className="h-6"
          >
            Sign it
          </Button>
        </div>
        {signedTx && 
          <div className='flex items-center justify-center'>
            Signed tx:
            <CopyHelper
              clipboard={signedTx}
              content={shorten(signedTx, 10)}
            />
          </div>
        }
      </Sheet>
    </Modal>
  )
}