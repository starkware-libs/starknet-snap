const {defaultProvider} = require('starknet');
import {TransactionStatusFriendlyMessage} from './transactionStatusEnums';

/**
 * [step 4] equivalent to the starknet-cli command:
 * starknet tx_status --contracts <compiledContract> --network alpha-goerli --hash <transaction_hash>
 * options written in starknet-provider Status type.
 * @param {*} transaction_hash
 * @returns the given transaction_hash's current status.
 */
export async function getTransactionStatus(transaction_hash) {
  try {
    return await defaultProvider.getTransactionStatus(transaction_hash);
  } catch (ex) {
    console.error("Couldn't get transaction's status: ", ex.message);
    return Promise.reject(ex);
  }
}

/**
 * @param {*} transaction_hash
 * @returns String: a more verbose status.
 */
export async function getFriendlyTransactionStatus(transaction_hash) {
  return TransactionStatusFriendlyMessage[
    getTransactionStatus(transaction_hash)
  ];
}
