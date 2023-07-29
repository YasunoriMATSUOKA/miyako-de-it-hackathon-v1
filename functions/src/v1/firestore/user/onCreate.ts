import functions from '../../../utils/firebase';
// import { hasAlreadyTriggered } from '../../../utils/firebase/triggerOnce';
import { logger } from '../../../utils/firebase/logger';
import { converter } from '../../../utils/firebase/converter';
import { User } from './model';

export const onCreate = functions
  .runWith({
    memory: '128MB',
  })
  .region('asia-northeast1')
  .firestore.document('/users/{uid}')
  .onCreate(async (snapshot, context) => {
    // if (
    //   await hasAlreadyTriggered(context.eventId, 'v1-firestore-user-onCreate')
    // ) {
    //   logger.debug('onCreate: Already triggered');
    //   return;
    // }
    logger.debug({ snapshot, context });
    const createdUser = converter<User>().fromFirestore(snapshot);
    logger.debug({ createdUser });
  });
