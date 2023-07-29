import functions from '../../../utils/firebase';
// import { hasAlreadyTriggered } from '../../../utils/firebase/triggerOnce';
import { logger } from '../../../utils/firebase/logger';
import { Dog } from './model';
import { converter } from '../../../utils/firebase/converter';

export const onDelete = functions
  .runWith({
    memory: '128MB',
  })
  .region('asia-northeast1')
  .firestore.document('/dogs/{dogId}')
  .onDelete(async (snapshot, context) => {
    // if (
    //   await hasAlreadyTriggered(context.eventId, 'v1-firestore-user-onDelete')
    // ) {
    //   logger.debug('onDelete: Already triggered');
    //   return;
    // }
    logger.debug({ snapshot, context });
    const deletedDog = converter<Dog>().fromFirestore(snapshot);
    logger.debug({ deletedDog });
  });
