import {
  Account,
  AggregateTransaction,
  Deadline,
  MultisigAccountModificationTransaction,
  NetworkType,
  PlainMessage,
  RepositoryFactoryHttp,
  TransferTransaction,
} from 'symbol-sdk';
import { decrypt } from '../../cypher/encrypt';
import { firstValueFrom } from 'rxjs';
import { logger } from 'firebase-functions/v1';
import { Dog } from '../../../v1/firestore/dog/model';

export const sendInitializeDogMultisigAccountTx = async (
  feeAccountPrivateKey: string,
  dogMultisigEncryptedPrivateKey: string,
  saltForDog: string,
  ivForDog: string,
  userMultisigEncryptedPrivateKey: string,
  userCosignatoryEncryptedPrivateKey: string,
  saltForUser: string,
  ivForUser: string,
  encryptionKey: string,
  dog: Dog,
) => {
  const nodeUrl = 'https://mikun-testnet.tk:3001';
  const repositoryFactoryHttp = new RepositoryFactoryHttp(nodeUrl);

  // Get network info
  const networkType = await firstValueFrom(
    repositoryFactoryHttp.getNetworkType(),
  );
  const epochAdjustment = await firstValueFrom(
    repositoryFactoryHttp.getEpochAdjustment(),
  );
  const generationHash = await firstValueFrom(
    repositoryFactoryHttp.getGenerationHash(),
  );

  const dogMultisigAccountPrivateKey = decrypt(
    dogMultisigEncryptedPrivateKey,
    encryptionKey,
    saltForDog,
    ivForDog,
  );
  const userMultisigAccountPrivateKey = decrypt(
    userMultisigEncryptedPrivateKey,
    encryptionKey,
    saltForUser,
    ivForUser,
  );
  const userCosignatoryAccountPrivateKey = decrypt(
    userCosignatoryEncryptedPrivateKey,
    encryptionKey,
    saltForUser,
    ivForUser,
  );

  const feeAccount = Account.createFromPrivateKey(
    feeAccountPrivateKey,
    networkType,
  );
  const dogMultisigAccount = Account.createFromPrivateKey(
    dogMultisigAccountPrivateKey,
    NetworkType.TEST_NET,
  );
  const userMultisigAccount = Account.createFromPrivateKey(
    userMultisigAccountPrivateKey,
    NetworkType.TEST_NET,
  );
  const userCosignatoryAccount = Account.createFromPrivateKey(
    userCosignatoryAccountPrivateKey,
    networkType,
  );

  const deadline = Deadline.create(epochAdjustment);

  const innerMultisigModificationTx =
    MultisigAccountModificationTransaction.create(
      deadline,
      1,
      1,
      [userMultisigAccount.address],
      [],
      NetworkType.TEST_NET,
    ).toAggregate(dogMultisigAccount.publicAccount);

  const messageJson = {
    type: 'InitializeDogMultisigAccount',
    ...dog,
  };
  const innerFeeTx = TransferTransaction.create(
    deadline,
    dogMultisigAccount.address,
    [],
    PlainMessage.create(JSON.stringify(messageJson)),
    networkType,
  ).toAggregate(feeAccount.publicAccount);

  const aggregateCompleteTx = AggregateTransaction.createComplete(
    deadline,
    [innerMultisigModificationTx, innerFeeTx],
    networkType,
    [],
  ).setMaxFeeForAggregate(100, 2);

  const signedAggregateCompleteTx = feeAccount.signTransactionWithCosignatories(
    aggregateCompleteTx,
    [dogMultisigAccount, userCosignatoryAccount],
    generationHash,
  );

  const hash = signedAggregateCompleteTx.hash;

  // Start monitoring of transaction status with websocket
  const listener = repositoryFactoryHttp.createListener();
  await listener.open();
  listener.newBlock().subscribe((block) => {
    logger.debug('New blok');
    logger.debug({ block });
  });
  listener.status(feeAccount.address).subscribe((status) => {
    logger.debug('Transaction status error');
    logger.debug({ status });
    logger.debug({
      status: 'error',
      address: status.address.plain(),
      hash: status.hash,
    });
    if (status.hash === hash) {
      listener.close();
    }
  });
  listener
    .unconfirmedAdded(feeAccount.address)
    .subscribe((unconfirmedTransaction) => {
      logger.debug('Transaction unconfirmed');
      logger.debug({ unconfirmedTransaction });
    });
  listener.confirmed(feeAccount.address).subscribe((confirmedTransaction) => {
    logger.debug('Transaction confirmed');
    logger.debug(
      `https://testnet.symbol.fyi/transactions/${confirmedTransaction.transactionInfo?.hash}`,
    );
    logger.debug({ confirmedTransaction });
    listener.close();
  });

  // Announce transaction
  const transactionRepository =
    repositoryFactoryHttp.createTransactionRepository();
  const transactionAnnounceResponse = await firstValueFrom(
    transactionRepository.announce(signedAggregateCompleteTx),
  );
  logger.debug({ transactionAnnounceResponse });
};
