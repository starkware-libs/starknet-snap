const {toBN} = require('starknet/dist/utils/number');
const {waitForTransaction} = require('./waitForTx');
/**
 * [step 3] perform various transactions to the account:
 *  - mint some erc20 token to that account,
 *  - get the current account's nonce using 'call_contract',
 *  - perform another transfer to this account from the same erc20 contract- with 'execute'. this will advance the account's nonce.
 * @param {*} account type Account.
 * 						an Account module that was initialized using the correct keyPair,
 * 						the same that relates to the publicKey that was used
 * 						when deploying the account-contract to starknet.
 * @param {*} tokenContract type Contract.
 * 						a pre-deployed erc20token contract (on starknet).
 * 						copied from '__mocks__' in starknet.js
 */
export async function sendTransactions(account, tokenContract) {
  const mintTransaction = await tokenContract.invoke('mint', {
    recipient: account.address,
    amount: Math.floor(Math.random() * 1000 + 1).toString()
  });
  await waitForTransaction(mintTransaction, 'mint');

  const {result} = await account.callContract({
    contractAddress: account.address,
    entrypoint: 'get_nonce'
  });
  const nonce = result[0];
  console.log('nonce: ', nonce);

  const executeTransaction = await account.execute({
    contractAddress: tokenContract.connectedTo,
    entrypoint: 'transfer',
    calldata: [toBN(tokenContract.connectedTo).toString(), '10']
  });

  getFriendlyTransactionStatus(executeTransaction.transaction_hash);

  const finalResult = await waitForTransaction(
    executeTransaction,
    'account execute'
  );

  return finalResult;
}
