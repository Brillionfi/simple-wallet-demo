import { LoginTypes } from '@/utils/types';
import { SessionManager } from './SessionManager';
import { WalletsManager } from './Accounts/WalletsManager';
import { useEffect, useState } from 'react';
import { Notifications } from './Notifications';
import { Portfolio } from './Portfolio';
import { WalletFormats, WalletTypes } from '@brillionfi/wallet-infra-sdk/dist/models/wallet.models';
import { useWalletInfraSdk } from '@/hooks/useWalletInfraSdk';
import { SUPPORTED_CHAINS } from '@brillionfi/wallet-infra-sdk/dist/models';

export const Dashboard = ({ json, jwt, payload }: { json: string; jwt: string; payload: Record<string, string> }) => {
  const [account, setAccount] = useState<string>();
  const [format, setFormat] = useState<WalletFormats>();
  const [walletType, setWalletType] = useState<WalletTypes>();
  const { walletInfra, createTransactionSdk } = useWalletInfraSdk();

  const role = payload.role as LoginTypes;

  const sendTx = async () => {
    const tx = await createTransactionSdk(
      "0x7b1Dcd0198A7C21F122Bd90189871AAA745F1151",
      "0x840B04a984b5BCD3aD2C754556f99Db3015dc3Bc",
      "10000000000000000", // 0.01 
      "0x",
      SUPPORTED_CHAINS.ETHEREUM_SEPOLIA
    );
  }
  const approve = async () => {
    const tx = await walletInfra.Transaction.approveSignTransaction("13763579-2c0d-4e01-8319-0e8ce0cf7368", "60b4deb2-e9ff-4de3-8522-aa3ed91f7487", "sha256:107184a8442052935205192584d92ba4845168c31199908525ae2977722bd8f6", 'localhost');
    console.log(' tx :>> ',  tx);
  }
  const getTx = async () => {
    const tx = await walletInfra.Transaction.getTransactionById("13763579-2c0d-4e01-8319-0e8ce0cf7368");
    console.log('tx :>> ', tx);
  }

  return (
    <div className="min-h-screen px-10 bg-white">
      <button onClick={approve}>sign</button>
      <br />
      <button onClick={getTx}>getTx</button>
      <br />
      <button onClick={sendTx}>sendTx</button>
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
