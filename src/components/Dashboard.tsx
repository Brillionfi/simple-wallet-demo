import { LoginTypes } from '@/utils/types';
import { SessionManager } from './SessionManager';
import { WalletsManager } from './Accounts/WalletsManager';
import { useState } from 'react';
import { Notifications } from './Notifications';
import { Portfolio } from './Portfolio';
import { WalletFormats, WalletTypes } from '@brillionfi/wallet-infra-sdk/dist/models/wallet.models';
import { SUPPORTED_CHAINS } from '@brillionfi/wallet-infra-sdk/dist/models';
import { useBrillionContext, useTransaction } from '@brillionfi/waas-react-sdk';

export const Dashboard = ({ json, jwt, payload }: { json: string; jwt: string; payload: Record<string, string> }) => {
  const [account, setAccount] = useState<string>();
  const [format, setFormat] = useState<WalletFormats>();
  const [walletType, setWalletType] = useState<WalletTypes>();
  const { sdk } = useBrillionContext();
  const { createTransaction } = useTransaction();

  const role = payload.role as LoginTypes;

  const sendTx = async () => {
    const tx = await createTransaction({
      transactionType: "unsigned",
      from: "0x037f1851E51f298F2F119e0af76630DA93C80251",
      to: "0x840B04a984b5BCD3aD2C754556f99Db3015dc3Bc",
      value: "1000000000000000", // 0.001 
      data: "0x",
      chainId: SUPPORTED_CHAINS.POLYGON_AMOY
    });
    
    // const tx = await sdk?.Transaction.createTransaction({
    //   transactionType: TransactionTypeKeys.UNSIGNED,
    //   from: "0x037f1851E51f298F2F119e0af76630DA93C80251",
    //   to: "0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904",
    //   value: "0",
    //   data: "0xa9059cbb000000000000000000000000840b04a984b5bcd3ad2c754556f99db3015dc3bc000000000000000000000000000000000000000000000000002386f26fc10000",
    //   chainId: SUPPORTED_CHAINS.POLYGON_AMOY,
    // })
    console.log('tx :>> ', tx);
  }

  const approve = async () => {
    const tx = await sdk?.Transaction.approveSignTransaction("13763579-2c0d-4e01-8319-0e8ce0cf7368", "60b4deb2-e9ff-4de3-8522-aa3ed91f7487", "sha256:107184a8442052935205192584d92ba4845168c31199908525ae2977722bd8f6", 'localhost');
    console.log(' tx :>> ',  tx);
  }

  const getTx = async () => {
    const tx = await sdk?.Transaction.getTransactionById("13763579-2c0d-4e01-8319-0e8ce0cf7368");
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
        <Notifications address={account} format={format} />
        {role === LoginTypes.WalletUser && (
          <WalletsManager
            account={account}
            setAccount={setAccount}
            setFormat={setFormat}
            setWalletType={setWalletType}
          />
        )}
        {account && format && walletType && (
          <Portfolio account={account} format={format} walletType={walletType} />
        )}
      </div>
    </div>
  );
};
