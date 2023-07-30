import { db } from '../../../utils/firebase';
import { converter } from '../../../utils/firebase/converter';

export type User = {
  id: string;
  name: string;
  imageUrl: string;
  multisigAddress: string;
  multisigPublicKey: string;
  multisigEncryptedPrivateKey: string;
  cosignatoryAddress: string;
  cosignatoryPublicKey: string;
  cosignatoryEncryptedPrivateKey: string;
  salt: string;
  iv: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};
export type NewUser = Omit<User, 'id'>;
export type UpdatedUser = Partial<NewUser> & { id: string };

const collectionPath = '/users';
const collectionRef = db
  .collection(collectionPath)
  .withConverter(converter<User>());
const newCollectionRef = db
  .collection(collectionPath)
  .withConverter(converter<NewUser>());
const docRef = (uid: string) =>
  db.collection(collectionPath).doc(uid).withConverter(converter<User>());

export const getUser = async (uid: string) => {
  return (await docRef(uid).get()).data();
};

export const getUsers = async () => {
  return (await collectionRef.get()).docs.map((snapshot) => snapshot.data());
};

export const createUser = async (newUser: NewUser) => {
  const docId = newCollectionRef.doc().id;
  docRef(docId).set({ id: docId, ...newUser });
  return await getUser(docRef(docId).id);
};

export const setUser = async (user: User) => {
  await docRef(user.id).set(user, { merge: true });
  return await getUser(user.id);
};

export const updateUser = async (updatedUser: UpdatedUser) => {
  await docRef(updatedUser.id).set(updatedUser, { merge: true });
  return await getUser(updatedUser.id);
};

export const deleteUser = async (uid: string): Promise<void> => {
  await docRef(uid).delete();
};
