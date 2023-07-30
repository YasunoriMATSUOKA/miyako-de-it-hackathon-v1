import { db } from '../../../utils/firebase';
import { converter } from '../../../utils/firebase/converter';

export type Dog = {
  id: string;
  name: string;
  dogMultisigAddress?: string;
  dogMultisigPublicKey?: string;
  dogMultisigEncryptedPrivateKey?: string;
  salt: string;
  iv: string;
  registrationNumber: string;
  breed: string;
  gender: string;
  color: string;
  father: string;
  mother: string;
  birthDate: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  ownerUserId: string;
};
export type NewDog = Omit<
  Dog,
  | 'id'
  | 'dogMultisigAddress'
  | 'dogMultisigPublicKey'
  | 'dogMultisigEncryptedPrivateKey'
> & { id?: string };
export type UpdatedDog = Partial<Omit<Dog, 'id'>> & { id: string };

const collectionPath = '/dogs';
const collectionRef = db
  .collection(collectionPath)
  .withConverter(converter<Dog>());
const newCollectionRef = db
  .collection(collectionPath)
  .withConverter(converter<NewDog>());
const docRef = (uid: string) =>
  db.collection(collectionPath).doc(uid).withConverter(converter<Dog>());
const newDocRef = (uid: string) =>
  db.collection(collectionPath).doc(uid).withConverter(converter<NewDog>());

export const getDog = async (dogId: string) => {
  return (await docRef(dogId).get()).data();
};

export const getDogs = async () => {
  return (await collectionRef.get()).docs.map((snapshot) => snapshot.data());
};

export const createDog = async (newDog: NewDog) => {
  const docId = newCollectionRef.doc().id;
  newDocRef(docId).set({ id: docId, ...newDog });
  return await getDog(docRef(docId).id);
};

export const setDog = async (dog: Dog) => {
  await docRef(dog.id).set(dog, { merge: true });
  return await getDog(dog.id);
};

export const updateDog = async (updatedDog: UpdatedDog) => {
  await docRef(updatedDog.id).set(updatedDog, { merge: true });
  return await getDog(updatedDog.id);
};

export const deleteUser = async (dogId: string): Promise<void> => {
  await docRef(dogId).delete();
};
