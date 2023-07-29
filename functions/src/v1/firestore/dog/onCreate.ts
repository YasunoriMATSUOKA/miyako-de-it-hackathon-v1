import functions from '../../../utils/firebase';
// import { hasAlreadyTriggered } from '../../../utils/firebase/triggerOnce';
import { logger } from '../../../utils/firebase/logger';
import { converter } from '../../../utils/firebase/converter';
import { Dog, UpdatedDog, updateDog } from './model';
import { defineSecret } from 'firebase-functions/params';
import { generateNewAccount } from '../../../utils/symbol/generateNewAccount';
import {
  createIvHexString,
  createSaltHexString,
  decrypt,
  encrypt,
} from '../../../utils/cypher/encrypt';
import { getUser } from '../user/model';
import { sendInitializeDogMultisigAccountTx } from '../../../utils/symbol/tx/sendInitializeDogMultisigTx';

const ENCRYPTION_KEY = defineSecret('ENCRYPTION_KEY');
const FEE_ACCOUNT_PRIVATE_KEY = defineSecret('FEE_ACCOUNT_PRIVATE_KEY');

export const onCreate = functions
  .runWith({
    memory: '128MB',
    secrets: [ENCRYPTION_KEY, FEE_ACCOUNT_PRIVATE_KEY],
    timeoutSeconds: 120,
  })
  .region('asia-northeast1')
  .firestore.document('/dogs/{dogId}')
  .onCreate(async (snapshot, context) => {
    // if (
    //   await hasAlreadyTriggered(context.eventId, 'v1-firestore-user-onCreate')
    // ) {
    //   logger.debug('onCreate: Already triggered');
    //   return;
    // }
    logger.debug({ snapshot, context });
    const createdDog = converter<Dog>().fromFirestore(snapshot);
    logger.debug({ createdDog });

    const now = new Date();

    const dogMultisigAccount = generateNewAccount();
    const saltForDog = createSaltHexString();
    const ivForDog = createIvHexString();
    const dogMultisigEncryptedPriateKey = encrypt(
      dogMultisigAccount.privateKey,
      ENCRYPTION_KEY.value(),
      saltForDog,
      ivForDog,
    );

    const updatedDog: UpdatedDog = {
      id: createdDog.id,
      dogMultisigAddress: dogMultisigAccount.address,
      dogMultisigPublicKey: dogMultisigAccount.publicKey,
      dogMultisigEncryptedPrivateKey: dogMultisigEncryptedPriateKey,
      salt: saltForDog,
      iv: ivForDog,
      updatedAt: now,
    };
    const dog = await updateDog(updatedDog);
    if (!dog) {
      throw Error('Dog not found');
    }

    const user = await getUser(createdDog.ownerUserId);
    logger.debug({ user });
    if (!user) {
      throw Error('User not found');
    }

    const userMultisigPrivateKey = decrypt(
      user.multisigEncryptedPrivateKey,
      ENCRYPTION_KEY.value(),
      user.salt,
      user.iv,
    );
    const userCosignatoryPrivateKey = decrypt(
      user.cosignatoryEncryptedPrivateKey,
      ENCRYPTION_KEY.value(),
      user.salt,
      user.iv,
    );

    await sendInitializeDogMultisigAccountTx(
      FEE_ACCOUNT_PRIVATE_KEY.value(),
      dogMultisigEncryptedPriateKey,
      saltForDog,
      ivForDog,
      user.multisigEncryptedPrivateKey,
      user.cosignatoryEncryptedPrivateKey,
      user.salt,
      user.iv,
      ENCRYPTION_KEY.value(),
      dog,
    );
  });
