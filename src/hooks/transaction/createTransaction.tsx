import {
  ChainId,
  ITransactionUnsigned,
  WalletInfra,
} from "@brillionfi/wallet-infra-sdk";
import {TransactionTypeKeys} from "@brillionfi/wallet-infra-sdk/dist/models/transaction.models";
import { IWalletSignTransactionResponse } from "@brillionfi/wallet-infra-sdk/dist/models/wallet.models";

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

export const ApproveTransactionSdk = async (
  walletInfra: WalletInfra,
  address: string,
  organizationId: string,
  fingerprint: string,
  fromOrigin: string,
): Promise<IWalletSignTransactionResponse> => {
  return await walletInfra.Wallet.approveTransaction(address, organizationId, fingerprint, fromOrigin);
};

export const RejectTransactionSdk = async (
  walletInfra: WalletInfra,
  address: string,
  organizationId: string,
  fingerprint: string,
  fromOrigin: string,
): Promise<IWalletSignTransactionResponse> => {
  return await walletInfra.Wallet.rejectTransaction(address, organizationId, fingerprint, fromOrigin);
};