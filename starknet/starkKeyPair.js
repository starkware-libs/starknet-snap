const {config} = require('../config/config');
const {ec} = require('starknet');

/**
 * [step 1] generates a random hex hash, that is appropriate to function as a 'stark privateKey'.
 * generate it's matching starkKeyPair and 'stark publicKey'.
 * @returns {starkKeyPair: object, publicKey: string}
 */
export function generateStarkKeyPair() {
  try {
    console.log('got inside generateStarkKeyPair');
    const privateKey = config.privateKey; // will be changed to be related to mm

    const starkKeyPair = ec.getKeyPair(privateKey);
    const publicKey = ec.getStarkKey(starkKeyPair);

    return {privateKey, starkKeyPair, publicKey};
  } catch (ex) {
    console.error("Couldn't get transaction's status: ", ex.message);
    return Promise.reject(ex);
  }
}
