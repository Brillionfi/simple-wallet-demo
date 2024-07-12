import {
  ChainId,
  ITransactionUnsigned,
  WalletInfra,
} from "@brillionfi/wallet-infra-sdk";
import {TransactionTypeKeys} from "@brillionfi/wallet-infra-sdk/dist/models/transaction.models";

export const createTransactionSdk = async (
  walletInfra: WalletInfra,
  fromAddress: string,
  toAddress: string,
  value: string,
  data: string,
  chainId: ChainId
) => {
  const newTransaction: ITransactionUnsigned = {
    transactionType: TransactionTypeKeys.UNSIGNED,
    from: fromAddress,
    to: toAddress,
    value: value,
    data: data,
    chainId: chainId,
  };

  await walletInfra.Wallet.setGasConfig(fromAddress, chainId, {
    gasLimit: "21000",
    maxFeePerGas: "103093310316",
    maxPriorityFeePerGas: "500000000",
  });

  const transaction = await walletInfra.Transaction.createTransaction(
    newTransaction
  );

  return transaction;
};
