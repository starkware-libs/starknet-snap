/**
 * [step 5] prints the link to view the given transaction in voyager.online
 * @param {*} transaction_hash
 * @returns string with link to voyager- to see the tx
 */
function viewTransactionInBrowser(transaction_hash) {
  const link =
    'can view transaction on link: ' +
    `https://goerli.voyager.online/tx/${transaction_hash}`;
  console.log(link);

  return link;
}
