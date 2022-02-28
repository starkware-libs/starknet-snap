const {ethErrors} = require('eth-rpc-errors');
const {deployAccount} = require('../starknet/account');
const {generateStarkKeyPair} = require('../starknet/starkKeyPair');

wallet.registerRpcMessageHandler(async (originString, requestObject) => {
  switch (requestObject.method) {
    case 'hello': {
      console.log('hello!');
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
    }

    case 'getSnapState': {
      const state = await wallet.request({
        method: 'snap_manageState',
        params: ['get']
      });
      return state;
    }

    case 'createKeyPair': {
      const result = generateStarkKeyPair();

      await wallet.request({
        method: 'snap_manageState',
        params: ['update', {...result.publicKey}]
      });

      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: 'Create a starknet-keypair',
            description:
              "keyPair & private keys shouldn't be save on the snap's state",
            textAreaContent:
              `publicKey: ${result.publicKey}\n\n` +
              'also created matching keyPair object.'
          }
        ]
      });
    }

    case 'deployAccount': {
      const state = await wallet.request({
        method: 'snap_manageState',
        params: ['get']
      });
      const approved = await wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: 'Deploy Account contract to Starknet',
            description:
              'Are you sure you want to deploy an account-contract to starknet?'
          }
        ]
      });
      if (!approved) {
        console.log(rpcErrors);
        throw ethErrors.provider.unauthorized();
      }
      let accountAddress;
      try {
        console.log(
          `trying to deploy an account with publicKey: ${state.publicKey}`
        );
        accountAddress = await deployAccount(state.publicKey);
      } catch (ex) {
        console.error(ex);
      }
      return accountAddress;
    }
    default:
      throw new Error('Method not found.');
  }
});
