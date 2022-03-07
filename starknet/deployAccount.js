// const {compileCalldata, defaultProvider} = require('starknet');
const {defaultProvider} = require('starknet');
const {compileCalldata} = require('./utils');
const {waitForTransaction} = require('./waitForTx');
const AccountContract = require('../contract/Account.json');

/**
 * [step 2] Deploys a given compiled contract (json) to starknet.
 * @param {*} publicKey (stark publicKey)
 * @param {*} CompiledAccountContract
 * 						an OpenZeppelin Account.cairo, from branch develop.
 * 						compiled using nile (can also be compiled using starknet-cli).
 * @returns the deployed account's address on starknet
 */
export async function deployAccount(publicKey) {
  const compiledCallData = compileCalldata({
    public_key: publicKey
  });
  const CompiledAccountContract = AccountContract;
  console.log('CompiledAccountContract:', '\n', CompiledAccountContract);
  const deployTransaction = await defaultProvider.deployContract({
    contract: CompiledAccountContract,
    constructorCalldata: compiledCallData
  });

  await waitForTransaction(deployTransaction, 'deploy Account');
}
