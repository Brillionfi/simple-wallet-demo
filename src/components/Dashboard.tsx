import { LoginTypes } from '@/utils/types';
import { SessionManager } from './SessionManager';
import { WalletsManager } from './Accounts/WalletsManager';
import { useState } from 'react';
import { Notifications } from './Notifications';
import { Portfolio } from './Portfolio';
import { WalletFormats, WalletTypes } from '@brillionfi/wallet-infra-sdk/dist/models/wallet.models';

export const Dashboard = ({ json, jwt, payload }: { json: string; jwt: string; payload: Record<string, string> }) => {
  const [account, setAccount] = useState<string>();
  const [format, setFormat] = useState<WalletFormats>();
  const [walletType, setWalletType] = useState<WalletTypes>();

  const role = payload.role as LoginTypes;
  return (
    <div className="min-h-screen px-10 bg-white">
      <div className="flex flex-col items-center gap-10 w-[800px] justify-start mt-7">
        <SessionManager json={json} jwt={jwt} />
        <Notifications jwt={jwt} address={account} format={format} />
        {role === LoginTypes.WalletUser && (
          <WalletsManager
            jwt={jwt}
            account={account}
            setAccount={setAccount}
            setFormat={setFormat}
            setWalletType={setWalletType}
          />
        )}
        {account && format && walletType && (
          <Portfolio jwt={jwt} account={account} format={format} walletType={walletType} />
        )}
      </div>
    </div>
  );
};
