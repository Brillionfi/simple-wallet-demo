import { useAccount, useConnect, useDisconnect, useSendTransaction, useSignMessage, useBalance, useBlockNumber, useGasPrice, useWriteContract, useTransactionCount } from "wagmi";
import { ConnectBrillionProps } from "@brillionfi/waas-react-sdk";
import { Button } from "@/components/ui/button";
import { ChainSelector } from "@/components/ui/ChainSelector";

export default function WagmiHomePage() {
  const { connect, connectors } = useConnect();
  const { isConnected, address, chainId } = useAccount();
  const { sendTransaction, data, isSuccess } = useSendTransaction();
  const { disconnect } = useDisconnect()
  const { writeContract } = useWriteContract()
  const { signMessage } = useSignMessage()
  const blockNumber = useBlockNumber()
  const gasPrice = useGasPrice()
  const balance = useBalance({ address })
  const nonce = useTransactionCount({
    address,
  })
  // const estimate = useEstimateGas({
  //   account: address, 
  //   to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  //   value: BigInt(1),
  // })
  // const usdtSupply = useReadContract({
  //   abi: [{
  //     "inputs": [],
  //     "name": "totalSupply",
  //     "outputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "",
  //         "type": "uint256"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   }],
  //   address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  //   functionName: 'totalSupply',
  // })
  // const usdt = useToken({
  //   address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  // })
  // const feeHistory = useFeeHistory({
  //   blockCount: 4,
  //   rewardPercentiles: [25, 75]
  // })
  // const simulate = useSimulateContract({
  //   abi: [{
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "from",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "address",
  //         "name": "to",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "uint256",
  //         "name": "amount",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "transferFrom",
  //     "outputs": [
  //       {
  //         "internalType": "bool",
  //         "name": "",
  //         "type": "bool"
  //       }
  //     ],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   }],
  //   address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  //   functionName: 'transferFrom',
  //   args: [
  //     address as `0x${string}`,
  //     '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  //     BigInt(1),
  //   ],
  // })
  console.log('balance :>> ', balance);

  const BrillionConnect = (provider: string, email?: string, walletName?: string) => {
    connect({
      connector: connectors[0],
      ...{
        provider,
        redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL as string}/wagmi`,
        email,
        walletName,
      } as ConnectBrillionProps
    })
  }

  const write = () => {
    writeContract({ 
      abi: [{
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }],
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      functionName: 'transferFrom',
      args: [
        address as `0x${string}`,
        '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        BigInt(1),
      ],
    })
  }

  const sendTx = () => {
    sendTransaction({
      to: "0x840B04a984b5BCD3aD2C754556f99Db3015dc3Bc",
      value: BigInt(1),
      data: "0x0"
    });
  }

  const thStyle = "text-center font-normal border-slate-200 border py-2 px-3";
  const tdStyle = "px-3 border-slate-200 border";
  return (
    <div className="min-h-screen px-10 bg-white">
      <div className="flex flex-col items-center gap-10 w-[800px] justify-start mt-7">
        {!isConnected && 
          <>
            <Button onClick={()=>BrillionConnect("Google")} >
              Connect Wallet with Google
            </Button>
            <Button onClick={()=>BrillionConnect("Discord")} >
              Connect Wallet with Discord
            </Button>
            <Button onClick={()=>BrillionConnect("WalletConnect")} >
              Connect Wallet with WalletConnect
            </Button>
            <Button onClick={()=>BrillionConnect("Metamask")} >
              Connect Wallet with Metamask
            </Button>
          </>
        }
        {isConnected && address && 
          <>
            <div className='flex gap-5'>
              <ChainSelector />
              <Button onClick={()=>disconnect()} >
                disconnect Wallet
              </Button>
            </div>
            <hr />
            <table className="rounded-md overflow-hidden text-gray-500 border-solid border-slate-200 text-sm relative">
              <thead className="bg-slate-100">
                <tr>
                  <th className={thStyle}>Data</th>
                  <th className={thStyle}>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={`${tdStyle} w-1/12`}>Address</td>
                  <td className={`${tdStyle} w-1/12`}>{address}</td>
                </tr>
                <tr>
                  <td className={`${tdStyle} w-1/12`}>Current Chain</td>
                  <td className={`${tdStyle} w-1/12`}>{chainId}</td>
                </tr>
                <tr>
                  <td className={`${tdStyle} w-1/12`}>Current Nonce</td>
                  <td className={`${tdStyle} w-1/12`}>{nonce.data}</td>
                </tr>
                <tr>
                  <td className={`${tdStyle} w-1/12`}>Block Number</td>
                  <td className={`${tdStyle} w-1/12`}>{String(blockNumber.data)}</td>
                </tr>
                <tr>
                  <td className={`${tdStyle} w-1/12`}>Gas Price</td>
                  <td className={`${tdStyle} w-1/12`}>{String(gasPrice.data)}</td>
                </tr>
              </tbody>
            </table>
            <table className="rounded-md overflow-hidden text-gray-500 border-solid border-slate-200 text-sm relative">
              <thead className="bg-slate-100">
                <tr>
                  <th className={thStyle}>Coin</th>
                  <th className={thStyle}>Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={`${tdStyle} w-1/12`}>Balance</td>
                  <td className={`${tdStyle} w-1/12`}>{`${String(balance.data?.value)} ${balance.data?.symbol}`}</td>
                </tr>
              </tbody>
            </table>
            <div className='flex gap-5'>
              <Button onClick={sendTx} >
                Send tx
              </Button>
              <Button onClick={write} >
                Write tx
              </Button>
              <Button onClick={()=>signMessage({ message: 'hello world' })} >
                Sign message
              </Button>
            </div>
          </>
        }
      </div>
    </div>
  );
}
