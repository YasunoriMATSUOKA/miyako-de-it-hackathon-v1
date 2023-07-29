import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export default functions;
export const app = admin.initializeApp();
export const db = app.firestore();
db.settings({ ignoreUndefinedProperties: true });
export const FieldValue = admin.firestore.FieldValue;
export const Timestamp = admin.firestore.Timestamp;
export const auth = app.auth();
export const storage = app.storage();
