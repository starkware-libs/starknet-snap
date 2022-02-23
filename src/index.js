// const { ec, stark } = require('starknet');
// const { ethErrors } = require('eth-rpc-errors');
// const {
//   getBIP44AddressKeyDeriver,
//   deriveBIP44AddressKey,
// } = require('@metamask/key-tree');

wallet.registerRpcMessageHandler(async (originString, requestObject) => {
  switch (requestObject.method) {
    case 'hello': {
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `Hello, ${originString}!`,
            description:
              'This custom confirmation is just for display purposes.',
            textAreaContent:
              'But you can edit the snap source code to make it do something, if you want to!'
          }
        ]
      });
    }
    // case 'getKeyPair': {
    //   // const starkBIP44CoinTypeNode = wallet.request({
    //   //   method: 'snap_getBip44Entropy_9004',
    //   // });

    //   // craete an address key deriver function:
    //   // const deriveStarkcoinAddress = getBIP44AddressKeyDeriver(starkBIP44CoinTypeNode);

    //   // extended private key (also called 'seed'?)
    //   // m / purpose' / coin_type' / account' / change(0-external, 1-internal) / address_index
    //   // m / 44' / 9004' / 0' / 0 / 0

    //   // const addressKey0 = deriveStarkcoinAddress(0);
    //   // const extendedPrivateKey = deriveBIP44AddressKey(masterKey, {
    //   //   account: 0,
    //   //   address_index: 0,
    //   //   change: 0,
    //   // });
    //   const privateKey = await wallet.request({
    //     method: 'snap_getAppKey',
    //   });

    //   let starkKeyPair;
    //   try {
    //     console.log('privateKey:', privateKey);
    //     starkKeyPair = ec.getKeyPair(privateKey);
    //   } catch (error) {
    //     console.log('error: ', error);
    //   }

    //   // try {
    //   //   const starkKeyPair = ec.getKeyPair(extendedPrivateKey);
    //   //   console.log('starkKeyPair: ' + starkKeyPair);
    //   // } catch (err) {
    //   //   console.log('Problem in getKeyPair: ' + err.message || err)
    //   // }

    //   return wallet.request({
    //     method: 'snap_confirm',
    //     params: [
    //       {
    //         prompt: `generated data`,
    //         // description: `masterKey: ${starkBIP44CoinTypeNode.key}`,
    //         description: `starkKeyPair: ${starkKeyPair}`,
    //         textAreaContent: '',
    //       },
    //     ],
    //   });
    // }
    default:
      throw new Error('Method not found.');
  }
});
