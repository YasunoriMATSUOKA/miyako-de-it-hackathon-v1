import functions from '../../utils/firebase';
// import { hasAlreadyTriggered } from '../../utils/firebase/triggerOnce';
import { logger } from '../../utils/firebase/logger';
import { User, setUser } from '../firestore/user/model';
import { generateNewAccount } from '../../utils/symbol/generateNewAccount';
import { defineSecret } from 'firebase-functions/params';
import {
  createIvHexString,
  createSaltHexString,
  encrypt,
} from '../../utils/cypher/encrypt';
import { sendInitializeUserMultisigAccountTx } from '../../utils/symbol/tx/sendInitializeUserMultisigAccountTx';

const ENCRYPTION_KEY = defineSecret('ENCRYPTION_KEY');
const FEE_ACCOUNT_PRIVATE_KEY = defineSecret('FEE_ACCOUNT_PRIVATE_KEY');

export const onCreate = functions
  .runWith({
    memory: '128MB',
    secrets: [ENCRYPTION_KEY, FEE_ACCOUNT_PRIVATE_KEY],
    timeoutSeconds: 120,
  })
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (userRecord, context) => {
    // if (await hasAlreadyTriggered(context.eventId, 'v1-auth-onDelete')) {
    //   logger.debug('onCreate: Already triggered');
    //   return;
    // }
    logger.debug({
      userRecord,
      context,
    });
    const now = new Date();
    const multisigAccount = generateNewAccount();
    const cosignatoryAccount = generateNewAccount();
    const salt = createSaltHexString();
    const iv = createIvHexString();
    const multisigEncryptedPrivateKey = encrypt(
      multisigAccount.privateKey,
      ENCRYPTION_KEY.value(),
      salt,
      iv,
    );
    const cosignatoryEncryptedPrivateKey = encrypt(
      cosignatoryAccount.privateKey,
      ENCRYPTION_KEY.value(),
      salt,
      iv,
    );
    const newUser: User = {
      id: userRecord.uid,
      name: userRecord.displayName ?? '',
      imageUrl: userRecord.photoURL ?? '',
      multisigAddress: multisigAccount.address,
      multisigPublicKey: multisigAccount.publicKey,
      multisigEncryptedPrivateKey: multisigEncryptedPrivateKey,
      cosignatoryAddress: cosignatoryAccount.address,
      cosignatoryPublicKey: cosignatoryAccount.publicKey,
      cosignatoryEncryptedPrivateKey: cosignatoryEncryptedPrivateKey,
      salt,
      iv,
      createdAt: now,
    };
    logger.debug({ newUser });
    const user = await setUser(newUser);
    logger.debug({ user });
    if (!user) {
      logger.error('onCreate: setUser failed');
      return;
    }

    const feeAccountPrivateKey = FEE_ACCOUNT_PRIVATE_KEY.value();

    await sendInitializeUserMultisigAccountTx(
      feeAccountPrivateKey,
      multisigEncryptedPrivateKey,
      cosignatoryEncryptedPrivateKey,
      ENCRYPTION_KEY.value(),
      salt,
      iv,
      user?.id,
    );
  });
