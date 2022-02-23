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
              'But you can edit the snap source code to make it do something, if you want to!',
          },
        ],
      });

    case 'createKeyPair':
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: 'Create a starknet-keypair',
            description:
              "starknet keyPair is... and with it you'll be able to...",
          },
        ],
      });
    default:
      throw new Error('Method not found.');
  }
});
