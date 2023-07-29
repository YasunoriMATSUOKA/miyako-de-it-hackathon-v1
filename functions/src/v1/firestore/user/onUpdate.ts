import functions from '../../../utils/firebase';
// import { hasAlreadyTriggered } from '../../../utils/firebase/triggerOnce';
import { logger } from '../../../utils/firebase/logger';
import { converter } from '../../../utils/firebase/converter';
import { User } from './model';

export const onUpdate = functions
  .runWith({
    memory: '128MB',
  })
  .region('asia-northeast1')
  .firestore.document('/users/{uid}')
  .onUpdate(async (snapshot, context) => {
    // if (
    //   await hasAlreadyTriggered(context.eventId, 'v1-firestore-user-onUpdate')
    // ) {
    //   logger.debug('onUpdate: Already triggered');
    //   return;
    // }
    logger.debug({ snapshot, context });
    const beforeUser = converter<User>().fromFirestore(snapshot.before);
    logger.debug({ beforeUser });
    const afterUser = converter<User>().fromFirestore(snapshot.after);
    logger.debug({ afterUser });
  });
