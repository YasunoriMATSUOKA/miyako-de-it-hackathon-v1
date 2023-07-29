import functions from '../../../utils/firebase';
// import { hasAlreadyTriggered } from '../../../utils/firebase/triggerOnce';
import { logger } from '../../../utils/firebase/logger';
import { converter } from '../../../utils/firebase/converter';
import { Dog } from './model';

export const onUpdate = functions
  .runWith({
    memory: '128MB',
  })
  .region('asia-northeast1')
  .firestore.document('/dogs/{dogId}')
  .onUpdate(async (snapshot, context) => {
    // if (
    //   await hasAlreadyTriggered(context.eventId, 'v1-firestore-user-onUpdate')
    // ) {
    //   logger.debug('onUpdate: Already triggered');
    //   return;
    // }
    logger.debug({ snapshot, context });
    const beforeDog = converter<Dog>().fromFirestore(snapshot.before);
    logger.debug({ beforeDog });
    const afterDog = converter<Dog>().fromFirestore(snapshot.after);
    logger.debug({ afterDog });
  });
