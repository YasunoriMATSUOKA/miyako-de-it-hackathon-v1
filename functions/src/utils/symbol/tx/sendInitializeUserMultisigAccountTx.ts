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

export const sendInitializeUserMultisigAccountTx = async (
  feeAccountPrivateKey: string,
  multisigEncryptedPrivateKey: string,
  cosignatoryEncryptedPrivateKey: string,
  encryptionKey: string,
  salt: string,
  iv: string,
  uid: string,
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

  const multisigAccountPrivateKey = decrypt(
    multisigEncryptedPrivateKey,
    encryptionKey,
    salt,
    iv,
  );
  const cosignatoryAccountPrivateKey = decrypt(
    cosignatoryEncryptedPrivateKey,
    encryptionKey,
    salt,
    iv,
  );

  const feeAccount = Account.createFromPrivateKey(
    feeAccountPrivateKey,
    networkType,
  );
  const multisigAccount = Account.createFromPrivateKey(
    multisigAccountPrivateKey,
    NetworkType.TEST_NET,
  );
  const cosignatoryAccount = Account.createFromPrivateKey(
    cosignatoryAccountPrivateKey,
    networkType,
  );

  const deadline = Deadline.create(epochAdjustment);

  const innerMultisigModificationTx =
    MultisigAccountModificationTransaction.create(
      deadline,
      1,
      1,
      [cosignatoryAccount.address],
      [],
      NetworkType.TEST_NET,
    ).toAggregate(multisigAccount.publicAccount);

  const messageJson = {
    type: 'InitializeUserMultisigAccount',
    uid,
  };
  const innerFeeTx = TransferTransaction.create(
    deadline,
    multisigAccount.address,
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
    [multisigAccount, cosignatoryAccount],
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
