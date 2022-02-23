const {config} = require('../config/config');
const {ec} = require('starknet');

function generateKeyPair() {
  const privateKey1 = config.privateKey;
  // const privateKey2 = stark.randomAddress();

  const starkKeyPair = ec.getKeyPair(privateKey1);
  // const publicKey = ec.getStarkKey(starkKeyPair);

  // return {starkKeyPair, publicKey};
  return {privateKey1, starkKeyPair};
}

wallet.registerRpcMessageHandler(async (originString, requestObject) => {
  switch (requestObject.method) {
    case 'hello':
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `Hello, ${originString}!`,
            description:
              'Carmit, This custom confirmation is just for display purposes.',
            textAreaContent:
              'But you can edit the snap source code to make it do something, if you want to!'
          }
        ]
      });

    case 'createKeyPair': {
      let privateKey1;
      const result = generateKeyPair();

      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: 'Create a starknet-keypair',
            description:
              "starknet keyPair is... and with it you'll be able to...",
            textAreaContent: `1: ${result.privateKey1}\nstarkKeyPair: ${result.starkKeyPair}`
          }
        ]
      });
    }
    default:
      throw new Error('Method not found.');
  }
});
