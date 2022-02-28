const {defaultProvider} = require('starknet');

/**
 * [util] waits for the given transaction to be accepted on L2; prints the transaction info.
 * @param {*} transactionResponse
 * @param {*} transactionName
 * @returns the transaction's response-object.
 */
export async function waitForTransaction(transactionResponse, transactionName) {
  console.log(transactionName, ': ', transactionResponse);
  try {
    console.log(
      `Waiting for ${transactionName} transaction to be accepted on SN... Txn hash: `,
      transactionResponse.transaction_hash
    );
    await defaultProvider.waitForTx(transactionResponse.transaction_hash);
    if (transactionResponse.address) {
      console.log('Transaction accepted');
      return transactionResponse;
    }
  } catch (ex) {
    console.error('Transaction rejected', ex.message);
    return Promise.reject(ex);
  }
}
