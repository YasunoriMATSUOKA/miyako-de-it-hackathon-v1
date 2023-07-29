import functions from '../../utils/firebase';
// import { hasAlreadyTriggered } from '../../utils/firebase/triggerOnce';
import { logger } from '../../utils/firebase/logger';

export const onDelete = functions
  .runWith({
    memory: '128MB',
  })
  .region('asia-northeast1')
  .auth.user()
  .onDelete(async (userRecord, context) => {
    // if (await hasAlreadyTriggered(context.eventId, 'v1-auth-onDelete')) {
    //   logger.debug('onDelete: Already triggered');
    //   return;
    // }
    logger.debug({
      userRecord,
      context,
    });
    const uid = userRecord.uid;
    logger.debug({ uid });
  });
