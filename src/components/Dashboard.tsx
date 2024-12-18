import { SessionManager } from './SessionManager';
import { Notifications } from './Notifications';
import { Portfolio } from './Portfolio';
import { AddressPill, ChainSelector, defaultAddressPillStyles, defaultChainSelectorStyles, useBrillionContext } from '@brillionfi/waas-react-sdk';
import { CreateWalletModal } from '@/components/CreateWallet/CreateWalletModal';

export const Dashboard = ({ json, jwt }: { json: string; jwt: string}) => {
  const { wallet } = useBrillionContext();

  return (
    <div className="min-h-screen px-10 bg-white">
      <div className="flex flex-col items-center gap-10 w-[800px] justify-start mt-7">
        <SessionManager json={json} jwt={jwt} />
        {wallet !== "" ?
          <>
            <div className="flex items-center w-full justify-around">
              <AddressPill customStyles={{
                containerStyle:{
                  ...defaultAddressPillStyles.container,
                  backgroundColor: "none"
                },
              }}/>
              <ChainSelector data={{}} customStyles={{
                containerStyle:{
                  ...defaultChainSelectorStyles.container,
                  backgroundColor: "none"
                }
              }}/>
            </div>
            <Portfolio account={wallet}/>
            <Notifications />
          </>
          :
          <CreateWalletModal />
        }
      </div>
    </div>
  );
};
