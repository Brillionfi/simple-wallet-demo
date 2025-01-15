import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { WalletFormats } from '@brillionfi/wallet-infra-sdk/dist/models/wallet.models';
import { useWallet } from '@brillionfi/waas-react-sdk';
import { useState } from 'react';
import { getAuthentication } from '@/utils/getAuthentication';

export const CreateWalletModal = () => {
  const { createWallet } = useWallet();

  const [walletName, setWalletName] = useState<string | undefined>( undefined);
  const [errorStatus, setErrorStatus] = useState<string>("");
  
  const handleCreateWallet = async () => {
    if (!walletName) return;
    try {
      await createWallet({
        name: walletName,
        format: WalletFormats.ETHEREUM,
        authentication: await getAuthentication(walletName, "localhost"),
      });
    } catch (error) {
      setErrorStatus("Wallet creation failed");
      return;
    }
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={true}
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
          Give your wallet a name
        </Typography>
        <div className='flex justify-center items-center'>
          <div className="flex">
            <Input
              placeholder={"Wallet name"}
              className="h-6 m-2 w-[330px] text-xs"
              type="text"
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
            />
          </div>
          <Button
            disabled={!walletName}
            variant={"destructive"}
            onClick={handleCreateWallet}
            className="h-6"
          >
            Create wallet
          </Button>
        </div>
        <div>
          <small className="text-red-500">{errorStatus}</small>
        </div>
      </Sheet>
    </Modal>
  )
}