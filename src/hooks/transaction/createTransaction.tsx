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

  const transaction = await walletInfra.Transaction.createTransaction(
    newTransaction
  );

  return transaction;
};
