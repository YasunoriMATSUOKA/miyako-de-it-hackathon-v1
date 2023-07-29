import { Account, NetworkType } from 'symbol-sdk';

export const generateNewAccount = () => {
  const account = Account.generateNewAccount(NetworkType.TEST_NET);
  return {
    privateKey: account.privateKey,
    publicKey: account.publicKey,
    address: account.address.plain(),
  };
};
